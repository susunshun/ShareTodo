import React from 'react'
import {connect} from 'react-redux'
import AddTodo from '../components/AddTodo'
import {addTodo} from '../actions';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    addTodo: text => dispatch(addTodo(text))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddTodo)