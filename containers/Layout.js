import React from 'react'
import {connect} from 'react-redux'
import Layout from '../components/Layout'

const mapStateToProps = state => ({
    error: state.error
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout)