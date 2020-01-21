const modal = (state = {modalIsOpen: false, modalType: '', todo: {}, copied: false}, action) => {
    switch (action.type) {
        case 'TOGGLE_MODAL':
            return {modalIsOpen: !state.modalIsOpen, modalType: 'TODO', todo: action.todo};
        case 'TOGGLE_SHARE_MODAL':
            return {modalIsOpen: !state.modalIsOpen, modalType: 'SHARE'};
        case 'TOGGLE_COPY' :
            return {...state, copied: true}
        default:
            return state
    }
};

export default modal;