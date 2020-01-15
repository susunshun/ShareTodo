import React from 'react'
import {Field, reduxForm} from 'redux-form'
import styled from 'styled-components';
import {RenderField} from './RenderField';
import {maxLength20, required} from '../utils/Validation';
import NotesIcon from '@material-ui/icons/Notes';


let DetailForm = props => {
    const {handleSubmit} = props;
    return (
        <form onSubmit={handleSubmit}>
            <Title>
                <Field name="text" type="text"
                       component={RenderField} label='TODOを入力'
                       validate={[required, maxLength20]}
                />
            </Title>
            <Memo>
                <Notes>
                    <NotesIcon style={{width: 20}}/>
                </Notes>
                <MemoField name="memo" type="textarea"
                           component={RenderField} label='メモを記載'
                />
            </Memo>
            <button type="submit" disabled={props.invalid}>Save</button>
        </form>
    )
};

export const Title = styled.div`
    padding-left: 40px;
`;

export const Notes = styled.div`
  margin-right: 10px;
  width: 20px;
`;

export const Memo = styled.div`
    margin-top: 20px;
    margin-left: 10px;
    display:flex;
    align-items: flex-start;
    flex-direction:row;
`;

export const MemoField = styled(Field)`
    // margin-top: 10px;
`;


DetailForm = reduxForm({
    form: 'detail',
    enableReinitialize: true
})(DetailForm);

export default DetailForm