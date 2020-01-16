import React from 'react'
import {connect} from 'react-redux'
import {toggleModal, deleteTodo, updateTodo} from '../actions';
import DetailModal from "../components/DetailModal";

const mapStateToProps = state => ({
    modalIsOpen: state.modal.modalIsOpen,
    todo: state.modal.todo
});

const mapDispatchToProps = dispatch => ({
    toggleModal: (todo) => dispatch(toggleModal(todo)),
    deleteTodo: (id, pid) => dispatch(deleteTodo(id, pid)),
    updateTodo: (todo, pid) => dispatch(updateTodo(todo, pid))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailModal)
