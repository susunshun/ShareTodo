import {db} from '../lib/db';

export const create = title => async dispatch => {
    await new Promise(
        (resolve, reject) => {
            db.collection('events').add({
                title: title
            }).then(doc => {
                dispatch({
                    type: 'CREATE',
                    id: doc.id
                });
                resolve(doc.id);
            }).catch(error => {
                reject(error)
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

export const addTodo = (text, pid) => async dispatch => {
    let order = await new Promise((resolve, reject) => {
        db.collection('events').doc(pid).collection("todos").orderBy("order", "desc").limit(1)
            .get()
            .then(snapshot => {
                let latestOrder = 0;
                snapshot.forEach((doc) => {
                    latestOrder = doc.data().order
                });
                resolve(latestOrder + 1)
            }).catch(error => {
            reject()
        })
    });

    await new Promise(
        (resolve, reject) => {
            db.collection('events').doc(pid).collection("todos").add({
                text: text,
                completed: false,
                order: order
            }).then(doc => {
                dispatch({
                    type: 'ADD_TODO',
                    id: doc.id,
                    text: text,
                    order: order,
                    memo: ""
                });
                resolve(doc.id);
            }).catch(error => {
                reject(error)
            })
        }
    )
};

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

export const fetchDetail = (id) => async dispatch => {
    dispatch({
        type: 'NONE',
        code: 200
    });
    console.log("fetch detail")
    const ref = db.collection('todos').doc(id);
    ref.get().then((doc) => {
        if (doc.exists) {
            dispatch({
                type: 'FETCH_DETAIL',
                todo: {...doc.data(), id: doc.id}
            });
        } else {
            // TODO: ルーティングが変わったときにフィルター処理で行いたいよね
            dispatch({
                type: 'ERROR',
                code: 404
            });
            // TODO: 該当するタスクがなかったことの表示を行いたい
        }
    }).catch((error) => {
        console.log(`データを取得できませんでした (${error})`);
    });
};

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const fetchTodo = (pid) => async dispatch => {
    // TODO: ルーティングが変わったときにフィルター処理で行いたいよね
    dispatch({
        type: 'ERROR_NONE',
        code: null
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
                            order: doc.data().order,
                            text: doc.data().text,
                            memo: doc.data().memo,
                            completed: doc.data().completed
                        }
                    )
                });
                resolve(data)
            }).catch(error => {
            reject([])
        })
    });
    dispatch({
        type: 'FETCH_TODO',
        payload: result
    })
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

export const updateTodo = (todo, pid) => async dispatch => {
    await new Promise(
        (resolve, reject) => {
            db.collection('events').doc(pid).collection("todos").doc(todo.id).update({
                text: todo.text,
                memo: todo.memo
            }).then(() => {
                dispatch({
                    type: 'UPDATE_TODO',
                    todo
                });
                dispatch({
                    type: 'TOGGLE_MODAL',
                    todo: {}
                });
                resolve();
            }).catch(error => {
                console.log(`データを更新できませんでした (${error})`);
                reject(error)
            })
        }
    );
};

export const fetchEvent = (pid) => async dispatch => {
    const ref = db.collection('events').doc(pid);
    ref.get().then((doc) => {
        if (doc.exists) {
            dispatch({
                type: 'FETCH_EVENT',
                event: doc.data()
            });
        } else {
            // TODO: ルーティングが変わったときにフィルター処理で行いたいよね
            dispatch({
                type: 'ERROR',
                code: 404
            });
            // TODO: 該当するタスクがなかったことの表示を行いたい
        }
    }).catch((error) => {
        console.log(`データを取得できませんでした (${error})`);
    });
};

export const updateEventTitle = (title, pid) => async dispatch => {
    await new Promise(
        (resolve, reject) => {
            db.collection('events').doc(pid).update({
                title: title
            }).then(() => {
                dispatch({
                    type: 'UPDATE_EVENT_TITLE',
                    title
                });
                resolve();
            }).catch(error => {
                console.log(`データを更新できませんでした (${error})`);
                reject(error)
            })
        }
    );
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

