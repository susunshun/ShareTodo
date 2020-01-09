import {db} from '../lib/db';
import {order } from '../utils/listUtils';

export const onDrop = dropResult => async dispatch => {
    // TODO: order変更のリクエストを実装する
    // 複数人で操作した場合のチェック処理をしたほうがよさそう
    let toOrder = dropResult.addedIndex + 1;
    let fromOrder = dropResult.removedIndex + 1;

    dispatch({
        type: 'CHANGE_ORDER',
        fromOrder: fromOrder,
        toOrder: toOrder
    });

    let result = await new Promise((resolve, reject) => {
        db.collection('users').orderBy("order")
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
    // TODO: ここでStateの件数と差分があったら処理中断してリロードしたい
    // 「他の人が編集中です」的なアラート出して

    let list = order(result, fromOrder, toOrder)
    // TODO: トランザクション/バッチ処理にする
    await Promise.all(list.map(async todo => {
        return await updateOrder(todo.id, todo.order)
    }));
};

async function updateOrder(id, order) {
    await new Promise(
        (resolve, reject) => {
            db.collection('users').doc(id).update({
                order: order
            }).then(() => {
                resolve(id);
            }).catch(error => {
                reject(error)
            })
        }
    );
}

export const addTodo = text => async dispatch => {
    let order = await new Promise((resolve, reject) => {
        db.collection('users').orderBy("order", "desc").limit(1)
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
            db.collection('users').add({
                text: text,
                completed: false,
                order: order
            }).then(doc => {
                dispatch({
                    type: 'ADD_TODO',
                    id: doc.id,
                    text: text,
                    order: order
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

export const toggleTodo = (id, completed) => async dispatch => {
    dispatch({
        type: 'TOGGLE_TODO',
        id
    });
    // TODO: 通信中はリストをdeactiveにしたほうがよさそう
    // 連打して複数リクエストすると表示とデータがずれるため
    await new Promise(
        (resolve, reject) => {
            db.collection('users').doc(id).update({
                completed: !completed
            }).then(() => {
                resolve(id);
            }).catch(error => {
                reject(error)
            })
        }
    );
};


export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};

export const fetchTodo = () => async dispatch => {
    let result = await new Promise((resolve, reject) => {
        db.collection('users').orderBy("order")
            .get()
            .then(snapshot => {
                let data = []
                snapshot.forEach((doc) => {
                    data.push(
                        {
                            id: doc.id,
                            order: doc.data().order,
                            text: doc.data().text,
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

function checkOrder() {
    // TODO: 多人数の編集や同期ズレを修正するチェック処理を実装する
    // 各リクエスト後に行う想定
}