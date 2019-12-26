import {db} from '../lib/db';

let nextTodoId = 0;
export const addTodo = text => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
});

export const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
});

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
                      id:doc.id,
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