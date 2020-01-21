const create = (state = {isLoading: false}, action) => {
    switch (action.type) {
        case 'REQUEST_FETCH':
            return {isLoading: true};
        case 'SUCCESS_FETCH':
            return {isLoading: false};
        case 'FAILED_FETCH':
            return {isLoading: false};
        default:
            return state;
    }
};

export default create;
