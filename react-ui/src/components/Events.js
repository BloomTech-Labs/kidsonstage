import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter, Route } from 'react-router-dom';

import { getEvents /* , getInvitedEvents */ } from '../actions';

import EventCard from './EventCard';
import NewEventCard from './NewEventCard';
import SubscribeBox from './SubscribeBox';

import './css/events.css';

const mapStateToProps = (state) => {
  return {
    events: state.events,
    invitedEvents: state.invitedEvents,
  };
};

class Events extends Component {

  componentDidMount() {
    // const events =
    this.props.getEvents();
    // const invitedEvents = this.props.getInvitedEvents();

    // this.setState({
    //   events,
    //   // invitedEvents,
    // });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="page-body">
        <SubscribeBox />
        <NewEventCard />
          {this.props.events.map((event, i) => {
            return (
              <EventCard
                title={event.title}
                eventDate={event.eventDate}
                activated={event.activated}
                key={i}
                id={event.id}
                owner={event.owner}
              />
            );
          })}
          {/* {this.props.invitedEvents.map((event, i) => {
            return (
              <EventCard
                title={event.title}
                eventDate={event.eventDate}
                activated={event.activated}
                key={i}
                id={event.id}
                owner={event.owner}
              />
            );
          })}           */}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { getEvents /* ,  getInvitedEvents */ })(Events);
