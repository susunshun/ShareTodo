const error = (state = {}, action) => {
    switch (action.type) {
        case 'ERROR':
            return {code: action.code, message: action.message};
        case 'ERROR_NONE':
            return {};
        default:
            return state
    }
};

export default error;