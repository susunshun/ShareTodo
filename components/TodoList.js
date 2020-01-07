import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import {fetchTodo} from "../actions";

class TodoList extends React.Component {
    componentDidMount() {
        this.props.fetchTodo();
    }

    render() {
        return (
            <ul>
                {this.props.todos.map(todo => (
                    <Todo key={todo.id} {...todo} onClick={() => this.props.toggleTodo(todo.id, todo.completed)}/>
                ))}
            </ul>
        )
    }
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            order: PropTypes.number,
            completed: PropTypes.bool.isRequired,
            text: PropTypes.string.isRequired
        }).isRequired
    ).isRequired,
    toggleTodo: PropTypes.func.isRequired,
};

export default TodoList