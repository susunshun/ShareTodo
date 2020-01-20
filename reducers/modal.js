const modal = (state = {modalIsOpen: false, modalType: '', todo: {}}, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {modalIsOpen: !state.modalIsOpen, modalType: 'TODO', todo: action.todo};
        case 'TOGGLE_SHARE_MODAL':
            return {modalIsOpen: !state.modalIsOpen, modalType: 'SHARE'};
        default:
            return state
    }
};

export default modal;