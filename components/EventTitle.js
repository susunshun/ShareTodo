import React from 'react'
import styled from "styled-components";
import ShareIcon from '@material-ui/icons/Share';
import EventForm from "./EventForm";
import ShareModal from "../containers/ShareModal";
import {IconButton} from "@material-ui/core";

class EventTitle extends React.Component {
  componentDidMount() {
    this.props.fetchEvent(this.props.pid);
  }

  render() {
    return (
      <Root>
        <ShareModal shareId={this.props.pid}/>
        <EventForm
          onSubmit={event => this.props.updateEventTitle(event.title, this.props.pid)}
          initialValues={this.props.event}/>
        <Icon onClick={() => this.props.toggleModal()}>
          <ShareIcon style={{color: "white"}}/>
        </Icon>
      </Root>
    )
  }
}

EventTitle.propTypes = {};

export const Root = styled.div`
    display:flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between; 
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 4px;
    height: 40px;
`;

export const Icon = styled(IconButton)`
    padding-right: 10px;
    color:white;
`;

export default EventTitle