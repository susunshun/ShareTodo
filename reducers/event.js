const event = (state = {title:""}, action) => {
    switch (action.type) {
        case 'FETCH_EVENT':
            return action.event;
        default:
            return state
    }
};

export default event;