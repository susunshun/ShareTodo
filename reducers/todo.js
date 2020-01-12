const todo = (state = {id: '', text: ''}, action) => {
    switch (action.type) {
        case 'FETCH_DETAIL':
            console.log(action.todo)
            return action.todo;
        case 'DELETE_TODO':
            return state;
        default:
            return state
    }
};

export default todo;