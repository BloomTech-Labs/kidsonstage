import React, { Component } from 'react';

import './css/events.css';

// import 'bootstrap/dist/css/bootstrap.css';

// import {
//   Card,
//   Button,
//   Badge,
//   CardImg,
//   CardBody,
//   CardTitle,
//   CardText,
//   CardSubtitle,
//   CardImgOverlay,
//   CardHeader,
//   Collapse
// } from 'reactstrap';

class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="eventCard">
        {this.props.title}<br /><br />
        {this.props.eventDate} <br />
      </div>
    );
  }
}

export default Event;
