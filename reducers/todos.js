import {order} from '../utils/listUtils';

const todos = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_TODO':
            return [...action.payload];
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    order: action.order,
                    memo: '',
                    completed: false
                }
            ];
        case 'CHANGE_ORDER':
            let list = order(state, action.fromOrder, action.toOrder)

            list.sort(function (a, b) {
                if (a.order < b.order) return -1;
                if (a.order > b.order) return 1;
                return 0;
            });
            console.log(list);
            return list;
        case 'TOGGLE_TODO':
            return state.map(todo =>
                todo.id === action.id ? {...todo, completed: !todo.completed} : todo
            );
        case 'DELETE_TODO':
            return state.filter(todo => todo.id !== action.id);
        case 'UPDATE_TODO':
            return state.map(todo =>
                todo.id === action.todo.id ? action.todo : todo
            );
        default:
            return state
    }
};

export default todos;