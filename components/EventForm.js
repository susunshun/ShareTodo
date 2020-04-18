import React from 'react'
import PropTypes from 'prop-types'
import styled from "styled-components";
import ShareIcon from '@material-ui/icons/Share';
import {maxLength20, required} from "../utils/Validation";
import {RenderField} from "./RenderField";
import {Field, reduxForm} from 'redux-form'
import DetailForm, {
  ApplyButton,
  ButtonGroup,
  CancelButton,
  Memo,
  MemoField,
  Notes,
  Title,
  TodoText
} from "./DetailForm";
import {IconButton} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import NotesIcon from "@material-ui/icons/Notes";

let EventForm = props => {
  const {handleSubmit} = props;
  return (
    <Root>
      <form onSubmit={handleSubmit}>
        <Field name="title" type="text" color="white"
               component={RenderField} label='TODOを入力'
               validate={[required, maxLength20]}
        />
      </form>
    </Root>
  )
};

EventForm.propTypes = {};

EventForm = reduxForm({
  form: 'event',
  enableReinitialize: true
})(EventForm);

export const Root = styled.div`
    padding-left: 10px;
    width: 100%;
`;

export default EventForm