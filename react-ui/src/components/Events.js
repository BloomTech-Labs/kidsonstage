import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { BrowserRouter, Route } from 'react-router-dom';

import { getEvents } from '../actions';

import EventCard from './EventCard';
import NewEventCard from './NewEventCard';

import './css/events.css';

const mapStateToProps = (state) => {
  return {
    events: state.events,
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
    const events = this.props.getEvents();

    this.setState({
      events
    });
  }

  render() {
    return (
      <div className="wrapper">
        <div className="page-body">
          {this.props.events.map((event, i) => {
            return (
              <EventCard
                title={event.title}
                eventDate={event.eventDate}
                key={i}
                id={event.id}
              />
            );
          })}
          <NewEventCard />
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, { getEvents })(Events);
