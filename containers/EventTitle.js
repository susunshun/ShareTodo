import React from 'react'
import {connect} from 'react-redux'
import EventTitle from "../components/EventTitle";
import {fetchEvent} from "../actions";

const mapStateToProps = state => ({
    event: state.event
});

const mapDispatchToProps = dispatch => ({
    fetchEvent: (pid) => dispatch(fetchEvent(pid))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventTitle)