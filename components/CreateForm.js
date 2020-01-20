import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styled from 'styled-components';
import {maxLength20, required} from '../utils/Validation';
import Button from '@material-ui/core/Button';
import Link from "next/link";
import {green} from '@material-ui/core/colors';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const LinkTodo = ({url}) => {
    return (
        <LinkRoot>
            <Link href={'/todo/' + url}>
                <LinkButton variant="contained" style={{color: green[500]}}>
                    <CheckCircleOutlineIcon style={{color: green[500]}}/>
                    TODOリストに移動
                </LinkButton>
            </Link>
        </LinkRoot>
    )
};

const TitleNameField = ({input, label, type, disabled, meta: {error}}) => (
    <div>
        <TitleInput {...input} type={type} placeholder={label} autocomplete="off" disabled={disabled}/>
        <Error>
            {((error && (error !== '入力必須です') && <ErrorMessage>{error}</ErrorMessage>))}
        </Error>
    </div>
);

let CreateForm = props => {
    const {handleSubmit, url} = props;
    return (
        <Root onSubmit={handleSubmit}>
            <Title>
                <Field name="text" type="text"
                       component={TitleNameField} label='ex.買い物メモ'
                       disabled={url}
                       validate={[required, maxLength20]}
                />
            </Title>
            {url ? <LinkTodo url={url}/> : <CreateButton
                color="primary"
                variant="contained"
                type="submit"
                disabled={props.invalid}>
                GO
            </CreateButton>}
        </Root>
    )
};


export const TitleInput = styled.input`
    font-family:inherit;
    width: 100%;
    background:white;
    padding:10px;
    border-radius:5px;
    :focus {
        border: 0px;
    }
    border:none;
    outline: none;
    -webkit-appearance:none;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
`;

export const Error = styled.div`
    height: 10px;
`;
export const ErrorMessage = styled.span`
    font-size: 8px;
    color: red;
`;

export const Root = styled.form`
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column;
    justify-content: center;
`;

const Title = styled.div`
    width: 80%;
    padding: 10px;
    margin-bottom: 30px;
`;

export const CreateButton = styled(Button)`
    width: 80%;
`;

export const LinkRoot = styled.div`
    width: 100%;
    display:flex;
    align-items: center;
    flex-direction:column;
    justify-content: center;
`;

export const LinkButton = styled(Button)`
    width: 70%;
`;

CreateForm = reduxForm({
    form: 'create',
    enableReinitialize: true
})(CreateForm);

export default CreateForm