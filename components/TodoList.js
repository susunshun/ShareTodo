import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import {Container, Draggable} from 'react-smooth-dnd'

class TodoList extends React.Component {
    componentDidMount() {
        this.props.fetchTodo();
    }

    render() {
        return (
            <div>
                <Container onDrop={(dropResult) => this.props.onDrop(dropResult)}>
                    {this.props.todos.map(todo => {
                        return (
                            <Draggable key={todo.id}>
                                <Todo {...todo}
                                      onClick={() => this.props.toggleTodo(todo.id, todo.completed)}/>
                            </Draggable>
                        );
                    })}
                </Container>
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
};

export default TodoList