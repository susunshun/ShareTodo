import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import {Container, Draggable} from 'react-smooth-dnd'
import DetailModal from '../containers/DetailModal';

class TodoList extends React.Component {
    componentDidMount() {
        this.props.fetchTodo(this.props.pid);
    }

    render() {
        return (
            <div>
                <DetailModal pid={this.props.pid}/>
                <Container onDrop={(dropResult) => this.props.onDrop(dropResult, this.props.pid)}>
                    {this.props.todos.map(todo => {
                        return (
                            <Draggable key={todo.id}>
                                <Todo {...todo}
                                      toggleTodo={() => this.props.toggleTodo(todo.id, todo.completed, this.props.pid)}
                                      onClick={() => this.props.toggleModal(todo)}/>
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
            text: PropTypes.string.isRequired,
            memo: PropTypes.string
        }).isRequired
    ).isRequired,
    toggleTodo: PropTypes.func.isRequired,
    toggleModal: PropTypes.func.isRequired
};

export default TodoList