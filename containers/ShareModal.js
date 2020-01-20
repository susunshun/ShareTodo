import React from 'react'
import {connect} from 'react-redux'
import {toggleModal} from '../actions';
import ShareModal from "../components/ShareModal";

const mapStateToProps = state => ({
    modalIsOpen: state.modal.modalIsOpen,
    modalType: state.modal.modalType
});

const mapDispatchToProps = dispatch => ({
    toggleModal: () => dispatch(toggleModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShareModal)
