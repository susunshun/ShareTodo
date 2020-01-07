import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import {fetchTodo, addTodo} from "../actions";

class TodoList extends React.Component {
    componentDidMount() {
        this.props.fetchTodo();
    }

    render() {
        const {userPost} = this.props;

        return (
            <div>
                <div>
                    <input
                        type="text"
                        defaultValue=""
                        value={userPost}
                        ref="inputText"/>
                    <button onClick={() => {
                        this.props.addTodo(this.refs.inputText.value, this.props.todos.length)
                        this.refs.inputText.value = ''
                    }}>
                        Add Todo
                    </button>
                </div>
                <ul>
                    {this.props.todos.map(todo => (
                        <Todo key={todo.id} {...todo} onClick={() => this.props.toggleTodo(todo.id, todo.completed)}/>
                    ))}
                </ul>
            </div>
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
    addTodo: PropTypes.func.isRequired
};

export default TodoList