import {db} from '../lib/db';

const API_ROOT = process.env.API_ROOT;

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const build_request = (method, body) => ({
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: "same-origin", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(body), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
});

export const fetchTodo = (pid) => async dispatch => {
    // TODO: ルーティングが変わったときにフィルター処理で行いたいよね
    console.log('fetch todo');
    dispatch({
        type: 'ERROR_NONE',
        code: null
    });
    fetch(API_ROOT + '/events/' + pid + '/todos/')
        .then(response => {
            if (!response.ok) {
                dispatch(failRequestTags(response.status));
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then(res =>
            dispatch({
                type: 'FETCH_TODO',
                payload: res
            })
        ).catch(error => console.log(error));
};

export const updateTodo = (todo, pid) => async dispatch => {
    fetch(API_ROOT + '/events/' + pid + '/todos/' + todo.id, build_request("PUT", {text: todo.text, memo: todo.memo}))
        .then(response => {
            if (!response.ok) {
                dispatch(failRequestTags(response.status))
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then(res => {
                dispatch({
                    type: 'UPDATE_TODO',
                    todo
                });
                dispatch({
                    type: 'TOGGLE_MODAL',
                    todo: {}
                });
            }
        ).catch(error => console.log(error));
};

export const addTodo = (text, pid) => async dispatch => {
    fetch(API_ROOT + '/events/' + pid + '/todos/', build_request("POST", {text: text}))
        .then(response => {
            if (!response.ok) {
                dispatch(failRequestTags(response.status))
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then(res => {
                console.log(res)
                dispatch({
                    type: 'ADD_TODO',
                    id: res.id,
                    text: text,
                    order: res.order,
                    memo: ""
                });
            }
        ).catch(error => console.log(error));
};

export const deleteTodo = (id, pid) => async dispatch => {
    let result = await new Promise((resolve, reject) => {
        db.collection('events').doc(pid).collection("todos").orderBy("order")
            .get()
            .then(snapshot => {
                let data = []
                snapshot.forEach((doc) => {
                    data.push(
                        {
                            id: doc.id,
                            order: doc.data().order
                        }
                    )
                });
                resolve(data)
            }).catch(error => {
            reject([])
        })
    });

    let list = result.filter(todo => todo.id !== id);

    //　TODO:トランザクション処理にしたい
    await new Promise((resolve, reject) => {
        const ref = db.collection('events').doc(pid).collection("todos").doc(id);
        ref.delete().then(() => {
            dispatch({
                type: 'DELETE_TODO',
                id
            });
            dispatch({
                type: 'TOGGLE_MODAL',
                todo: {}
            });
            resolve();
        }).catch((error) => {
            // TODO: 削除エラーを表示する
            reject();
            console.log(`データを削除できませんでした (${error})`);
        })
    });

    await Promise.all(list.map(async (todo, index) => {
        return await updateOrder(todo.id, index, pid)
    }));
};

export const create = title => async dispatch => {
    dispatch({
        type: 'REQUEST_FETCH'
    });
    fetch(API_ROOT + '/events', build_request("POST", {title: title}))
        .then(response => {
            if (!response.ok) {
                dispatch(failRequestTags(response.status));
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then(res => {
                dispatch({
                    type: 'CREATE',
                    id: res.id
                });
                dispatch({
                    type: 'SUCCESS_FETCH'
                });
            }
        ).catch(error => {
            dispatch({
                type: 'FAILED_FETCH'
            })
        }
    );
};

export const onDrop = (dropResult, pid) => async dispatch => {
    let toOrder = dropResult.addedIndex;
    let fromOrder = dropResult.removedIndex;

    dispatch({
        type: 'CHANGE_ORDER',
        fromOrder: fromOrder,
        toOrder: toOrder
    });

    let result = await new Promise((resolve, reject) => {
        db.collection('events').doc(pid).collection("todos").orderBy("order")
            .get()
            .then(snapshot => {
                let data = []
                snapshot.forEach((doc) => {
                    data.push(
                        {
                            id: doc.id,
                            order: doc.data().order
                        }
                    )
                });
                resolve(data)
            }).catch(error => {
            reject([])
        })
    });
    let insertIndex = toOrder > fromOrder ? toOrder + 1 : toOrder;
    let deleteIndex = toOrder > fromOrder ? fromOrder : fromOrder + 1;
    let list = result.slice(0, result.length);
    list.splice(insertIndex, 0, result[fromOrder]);
    list.splice(deleteIndex, 1);

    // TODO: ここでStateの件数と差分があったら処理中断してリロードしたい
    // 「他の人が編集中です」的なアラート出して
    // TODO: トランザクション/バッチ処理にする
    await Promise.all(list.map(async (todo, index) => {
        return await updateOrder(todo.id, index, pid)
    }));
};

async function updateOrder(id, order, pid) {
    console.log(id)
    await new Promise(
        (resolve, reject) => {
            db.collection('events').doc(pid).collection("todos").doc(id).update({
                order: order
            }).then(() => {
                resolve(id);
            }).catch(error => {
                reject(error)
            })
        }
    );
}

export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const toggleTodo = (id, completed, pid) => async dispatch => {
    dispatch({
        type: 'TOGGLE_TODO',
        id
    });
    // TODO: 通信中はリストをdeactiveにしたほうがよさそう
    // 連打して複数リクエストすると表示とデータがずれるため
    await new Promise(
        (resolve, reject) => {
            db.collection('events').doc(pid).collection("todos").doc(id).update({
                completed: !completed
            }).then(() => {
                resolve(id);
            }).catch(error => {
                reject(error)
            })
        }
    );
};

export const fetchEvent = (pid) => async dispatch => {
    fetch(API_ROOT + '/events/' + pid)
        .then(response => {
            if (!response.ok) {
                dispatch(failRequestTags(response.status))
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then(res =>
            dispatch({
                type: 'FETCH_EVENT',
                event: res
            })
        ).catch(error => console.log(error));
};

export const updateEventTitle = (title, pid) => async dispatch => {
    fetch(API_ROOT + '/events/' + pid, build_request("PUT", {title: title}))
        .then(response => {
            if (!response.ok) {
                dispatch(failRequestTags(response.status))
                throw new Error(response.statusText);
            }
            return response.json()
        })
        .then(res =>
            dispatch({
                type: 'UPDATE_EVENT_TITLE',
                res
            })
        ).catch(error => console.log(error));
};

export const toggleModal = (todo) => async dispatch => {
    if (todo) {
        dispatch({
            type: 'TOGGLE_MODAL',
            todo
        })
    } else {
        dispatch({
            type: 'TOGGLE_SHARE_MODAL'
        })
    }
};

export const toggleCopy = () => async dispatch => {
    dispatch({
        type: 'TOGGLE_COPY'
    })
};

export const failRequestTags = (error) => ({
    type: 'ERROR',
    code: error,
});