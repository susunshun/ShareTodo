import React from 'react'
import PropTypes from 'prop-types'
import Todo from './Todo'
import DetailModal from '../containers/DetailModal';
import styled from "styled-components";
import {DragDropContext, Droppable} from "react-beautiful-dnd";

class TodoList extends React.Component {
  componentDidMount() {
    this.props.fetchTodo(this.props.pid);
  }

  onDragEnd = (result, pid) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }
    this.props.onDrop({fromOrder: result.source.index, toOrder: result.destination.index}, pid);
  }

  render() {
    return (
      <Root>
        <DetailModal pid={this.props.pid}/>
        <DragDropContext onDragEnd={result => this.onDragEnd(result, this.props.pid)}>
          <Droppable droppableId="list">
            {provided => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {this.props.todos.map(todo => {
                  return (
                    <Todo {...todo}
                          key={todo.id}
                          toggleTodo={() => this.props.toggleTodo(todo.id, todo.completed, this.props.pid)}
                          onClick={() => this.props.toggleModal(todo)}/>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Root>
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

export const Root = styled.div`
    overflow: scroll visible;
`;

export default TodoList