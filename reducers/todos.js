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
            let insertIndex = action.toOrder > action.fromOrder ? action.toOrder + 1 : action.toOrder;
            let deleteIndex = action.toOrder > action.fromOrder ? action.fromOrder : action.fromOrder + 1;
            let list = state.slice(0, state.length);
            list.splice(insertIndex, 0, state[action.fromOrder]);
            list.splice(deleteIndex, 1);
            list.map((todo, index) => {
                todo.order = index;
            });
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