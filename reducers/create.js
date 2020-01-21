const create = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE':
            return {url: action.id};
        default:
            return state;
    }
};

export default create;
