import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';
import Link from "next/link";
import Layout from "./Layout";


const Todo = ({toggleTodo, onClick, completed, text}) => (
  <Root>
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
      {text}
    </TodoText>
  </Root>

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