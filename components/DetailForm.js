import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styled from 'styled-components';

let DetailForm = props => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <Title name="text" component="input" type="text" placeholder='todo'/>
            </div>
            <div>
                <Memo name="memo" component="textarea" type="text" placeholder='メモを記載' />
            </div>
            <button type="submit">Save</button>
        </form>
    )
};

export const Title = styled(Field)`
  font-size: 20px;
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

export const Memo = styled(Field)`
  margin-top: 10px;
  padding: 10px;
  width: 90%;
`;


DetailForm = reduxForm({
    // a unique name for the form
    form: 'detail',
    enableReinitialize: true
})(DetailForm);

export default DetailForm