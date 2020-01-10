const todo = (state = {id: '', text: ''}, action) => {
    switch (action.type) {
        case 'FETCH_DETAIL':
            return action.todo;
        case 'DELETE_TODO':
            return state;
        default:
            return state
    }
};

export default todo;