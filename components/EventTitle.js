import React from 'react'
import styled from "styled-components";
import ShareIcon from '@material-ui/icons/Share';
import EventForm from "./EventForm";

class EventTitle extends React.Component {
    componentDidMount() {
        this.props.fetchEvent(this.props.pid);
    }

    render() {
        return (
            <Root>
                <EventForm
                    onSubmit={event => this.props.updateEventTitle(event.title, this.props.pid)}
                    initialValues={this.props.event}/>
                <Icon>
                    <ShareIcon style={{}}/>
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
    // background-color: rgba(255,255,255,0.5);
    border-radius: 4px;
    height: 40px;
`;

export const Icon = styled(ShareIcon)`
    height: 14px;
    padding-right: 10px;
    color:white;
`;

export default EventTitle