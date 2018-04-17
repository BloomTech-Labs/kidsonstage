import React, { Component } from 'react';

import { Progress } from 'reactstrap';

import './css/events.css';

class EventsNew extends Component {
  render() {
    return (
      <div>
        Add New Event
        <Progress value="50">Step 1 of 2 - Create Event</Progress>
      </div>
    );
  }
}

export default EventsNew;
