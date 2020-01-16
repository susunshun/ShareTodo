import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styled from 'styled-components';
import {RenderField} from './RenderField';
import {maxLength20, required} from '../utils/Validation';
import NotesIcon from '@material-ui/icons/Notes';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import {IconButton} from '@material-ui/core';
import handleSubmit from "redux-form/lib/handleSubmit";

let CreateForm = props => {
    const {handleSubmit} = props;
    return (
        <Root>
            <form onSubmit={handleSubmit}>
                <Title>
                    <Field name="text" type="text"
                           component={RenderField} label='TODOを入力'
                           validate={[required, maxLength20]}
                    />
                </Title>
                <CreateButton color="primary"
                              type="submit"
                              disabled={props.invalid}>
                    Create
                </CreateButton>
            </form>
        </Root>
    )
}

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

export const CreateButton = styled(Button)`
    width: 80px;
    border:none;
`;


CreateForm = reduxForm({
    form: 'create',
    enableReinitialize: true
})(CreateForm);

export default CreateForm