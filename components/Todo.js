import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Checkbox from '@material-ui/core/Checkbox';


const Todo = ({onClick, completed, text}) => (
    <Root>
        <Checkbox
            checked={completed}
            value="secondary"
            color="primary"
            inputProps={{'aria-label': 'secondary checkbox'}}
            onClick={onClick}
        />
        <TodoText
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}>{text}</TodoText>
    </Root>

);

Todo.propTypes = {
    onClick: PropTypes.func.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired
};

export const Root = styled.div`
  background-color: white;
  font-size: 13px;
  margin: 1px 0;
  padding: 5px;
  border-radius: 4px;
`;

export const TodoText = styled.span`
  margin-left: 5px;
`;

export default Todo;