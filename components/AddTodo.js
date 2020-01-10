import React from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components";
import AddIcon from '@material-ui/icons/Add';

class AddTodo extends React.Component {
    render() {
        const {userPost} = this.props;

        return (
            <Root>
                <AddButton onClick={() => {
                    this.props.addTodo(this.refs.inputText.value);
                    this.refs.inputText.value = ''
                }}/>
                <InputArea
                    type="text"
                    defaultValue=""
                    placeholder="Todoを追加"
                    value={userPost}
                    ref="inputText"/>
            </Root>

        )
    }
}

AddTodo.propTypes = {
    addTodo: PropTypes.func.isRequired
};

export const Root = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right; 
  background-color: rgba(255,255,255,0.5);
  font-size: 13px;
  height: 40px;
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
`;

export const AddButton = styled(AddIcon)`
 padding: 0 10px;
`;

export const InputArea = styled.input`
  font-size: 13px;
  ::placeholder {
    font-size: 13px;
  }
  outline: none;
  :focus {
    border: 0px;  
  }
  border:none;
  background:none;
  -webkit-appearance:none;
  width: 100%;
`;

export default AddTodo