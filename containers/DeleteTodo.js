import React from 'react'
import {connect} from 'react-redux'
import {deleteTodo} from '../actions';
import DeleteTodo from "../components/DeleteTodo";

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  deleteTodo: id => dispatch(deleteTodo(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeleteTodo)