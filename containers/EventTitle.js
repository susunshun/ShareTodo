import React from 'react'
import {connect} from 'react-redux'
import EventTitle from "../components/EventTitle";
import {fetchEvent, updateEventTitle, toggleModal} from "../actions";

const mapStateToProps = state => ({
    event: state.event
});

const mapDispatchToProps = dispatch => ({
    fetchEvent: (pid) => dispatch(fetchEvent(pid)),
    updateEventTitle: (title, pid) => dispatch(updateEventTitle(title, pid)),
    toggleModal: () => dispatch(toggleModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventTitle)