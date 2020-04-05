import React from 'react'
import {connect} from 'react-redux'
import {toggleModal, toggleCopy} from '../actions';
import ShareModal from "../components/ShareModal";

const mapStateToProps = state => ({
  modalIsOpen: state.modal.modalIsOpen,
  modalType: state.modal.modalType,
  copied: state.modal.copied
});

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleModal()),
  toggleCopy: () => dispatch(toggleCopy())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShareModal)
