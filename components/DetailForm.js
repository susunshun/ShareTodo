import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styled from 'styled-components';
import {RenderField} from './RenderField';
import {maxLength20, required} from '../utils/Validation';
import NotesIcon from '@material-ui/icons/Notes';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from '@material-ui/core';


let DetailForm = props => {
    const {onSubmit, deleteTodo, close, update} = props;
    return (
        <Root>
            <form onSubmit={onSubmit}>
                <Title>
                    <TodoText>
                        <Field name="text" type="text"
                               component={RenderField} label='TODOを入力'
                               validate={[required, maxLength20]}
                        />
                    </TodoText>
                    <IconButton aria-label="delete" onClick={deleteTodo}>
                        <DeleteIcon  color="secondary" style={{width: 20}}/>
                    </IconButton>
                </Title>
                <Memo>
                    <Notes>
                        <NotesIcon style={{width: 20}}/>
                    </Notes>
                    <MemoField name="memo" type="textarea"
                               component={RenderField} label='メモを記載'
                    />
                </Memo>
                <ButtonGroup>
                    <CancelButton onClick={close}>cancel</CancelButton>
                    <ApplyButton color="primary" onClick={update} disabled={props.invalid}>apply</ApplyButton>
                </ButtonGroup>
            </form>
        </Root>
    )
};

export const Root = styled.div`
    width: 100%;
    padding: 0px;
`;

export const Title = styled.div`
    display:flex;
    align-items: flex-start;
    flex-direction:row;
    justify-content: space-between;
`;


export const TodoText = styled.div`
    margin-left: 8px;
    padding: 12px;
    width: 100%;
`;

export const Notes = styled.div`
  margin-right: 10px;
  width: 20px;
`;

export const Memo = styled.div`
    // margin-top: 10px;
    margin-left: 20px;
    display:flex;
    align-items: flex-start;
    flex-direction:row;
`;

export const MemoField = styled(Field)`
    // margin-top: 10px;
`;

export const ButtonGroup = styled.div`
    display:flex;
    justify-content: flex-end;
    width: 100%;
`;


export const CancelButton = styled(Button)`
    color: gray;
    width: 80px;
`;

export const ApplyButton = styled(Button)`
    width: 80px;
    border:none;
`;


DetailForm = reduxForm({
    form: 'detail',
    enableReinitialize: true
})(DetailForm);

export default DetailForm