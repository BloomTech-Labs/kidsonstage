import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter, Route } from 'react-router-dom';

import { getEvents } from '../actions';

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
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    // const events = 
    this.props.getEvents();

    // this.setState({
    //   events
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
          
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { getEvents })(Events);
