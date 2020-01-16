const modal = (state = {modalIsOpen: false, todo:{}}, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {modalIsOpen: !state.modalIsOpen, todo: action.todo};
        default:
            return state
    }
};

export default modal;