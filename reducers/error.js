const error = (state = {}, action) => {
    switch (action.type) {
        case 'ERROR':
            return {code: action.code, message: action.message};
        case 'NONE':
            return {};
        default:
            return state
    }
};

export default error;