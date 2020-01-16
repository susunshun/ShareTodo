import React from 'react'
import {connect} from 'react-redux'
import TodoList from '../components/TodoList'
import {VisibilityFilters} from '../actions'
import {fetchTodo, onDrop, toggleModal, toggleTodo} from '../actions';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter)
    }
};
const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
    modalIsOpen: state.modal.modalIsOpen,
    todo: state.modal.todo
});

const mapDispatchToProps = dispatch => ({
    toggleTodo: (id, completed, pid) => dispatch(toggleTodo(id, completed, pid)),
    fetchTodo: (pid) => dispatch(fetchTodo(pid)),
    onDrop: (dropResult, pid) => dispatch(onDrop(dropResult, pid)),
    toggleModal: (todo) => dispatch(toggleModal(todo))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)