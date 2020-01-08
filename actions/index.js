import {db} from '../lib/db';

export const onDrop = () => async dispatch => {
    // TODO: order変更のリクエストを実装する
    // 複数人で操作した場合のチェック処理をしたほうがよさそう
    console.log('dropped!!!!')
};

export const addTodo = text => async dispatch => {
    let order = await new Promise((resolve, reject) => {
        db.collection('users').orderBy("order", "desc").limit(1)
            .get()
            .then(snapshot => {
                let latestOrder = 1;
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
                console.log(order)
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
                            order: doc.data().id,
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