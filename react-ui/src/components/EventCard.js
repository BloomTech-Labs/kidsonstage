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

class EventCard extends Component {
  constructor(props) {
    super(props);
    const { id } = props;
    this.state = { id };
  }

  // componentDidMount() {
  //   this.setState({this.props.id});
  // }

  render() {
    return (
      <div className="eventCard--Container">
        <div className="eventCard--Title">{this.props.title}</div>
        <div className="eventCard--Date">{this.props.eventDate}</div>
        
      </div>
    );
  }
}

export default EventCard;
