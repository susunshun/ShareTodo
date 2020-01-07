import {db} from '../lib/db';

export const addTodo = (text, length) => async dispatch => {
    await new Promise(
        (resolve, reject) => {
            db.collection('users').add({
                text: text,
                completed: false,
                order: length + 1
            }).then(doc => {
                console.log(length)
                dispatch({
                    type: 'ADD_TODO',
                    id: doc.id,
                    text: text,
                    order: length + 1
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