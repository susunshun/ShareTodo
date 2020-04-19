import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import {Draggable} from "react-beautiful-dnd";

const Todo = ({toggleTodo, onClick, completed, text, id, order}) => (
  <Draggable draggableId={id} index={order} >
    {provided => (
      <Root
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
      >
        <Checkbox
          checked={completed}
          value="secondary"
          color="primary"
          inputProps={{'aria-label': 'secondary checkbox'}}
          onClick={toggleTodo}
        />
        <TodoText
          onClick={onClick}
          style={{
            textDecoration: completed ? 'line-through' : 'none'
          }}>
          <p>{text}</p>
        </TodoText>
      </Root>
    )}
  </Draggable>
);

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
};

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: white;
  font-size: 13px;
  margin: 1px 0;
  padding: 5px;
  border-radius: 4px;
`;

export const TodoText = styled.div`
  margin-left: 5px;
  width: 100%;
  height: 100%;
`;

export default Todo;