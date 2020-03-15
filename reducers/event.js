const event = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_EVENT':
            return action.event;
        case 'UPDATE_EVENT_TITLE':
            return state;
        default:
            return state;
    }
};

export default event;