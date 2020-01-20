const event = (state = {title:""}, action) => {
    switch (action.type) {
        case 'FETCH_EVENT':
            return action.event;
        case 'UPDATE_EVENT_TITLE':
            return {title: action.title};
        default:
            return state
    }
};

export default event;