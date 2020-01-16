const create = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE':
            console.log('create');
            return {url: action.id};
        default:
            return state;
    }
};

export default create;
