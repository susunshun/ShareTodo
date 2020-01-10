import React from 'react'
import {connect} from 'react-redux'
import Detail from '../components/Detail'
import {fetchDetail} from '../actions'

const mapStateToProps = state => ({
    todo: state.todo
});

const mapDispatchToProps = dispatch => ({
    fetchDetail: (id) => dispatch(fetchDetail(id))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail)