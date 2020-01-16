import React from 'react'
import {connect} from 'react-redux'
import {create} from '../actions';
import Create from "../components/Create";

const mapStateToProps = state => ({
    url: state.create.url
});

const mapDispatchToProps = dispatch => ({
    create: title => dispatch(create(title))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create)
