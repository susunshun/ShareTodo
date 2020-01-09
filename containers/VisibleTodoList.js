import React from 'react'
import {connect} from 'react-redux'
import {toggleTodo} from '../actions'
import TodoList from '../components/TodoList'
import {VisibilityFilters} from '../actions'
import {fetchTodo, onDrop} from '../actions';

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
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
});

const mapDispatchToProps = dispatch => ({
    toggleTodo: (id, completed) => dispatch(toggleTodo(id, completed)),
    fetchTodo: () => dispatch(fetchTodo()),
    onDrop: (dropResult) => dispatch(onDrop(dropResult))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoList)