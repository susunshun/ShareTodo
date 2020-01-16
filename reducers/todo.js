const todo = (state = {id: '', text: ''}, action) => {
    switch (action.type) {
        case 'FETCH_DETAIL':
            return action.todo;
        default:
            return state
    }
};

export default todo;