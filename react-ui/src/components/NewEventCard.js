import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import faPlusCircle from '@fortawesome/fontawesome-free-solid/faPlusCircle';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

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

class NewEventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LinkContainer exact to="/events/new">
        <div className="newEventCard--Container">
          <div className="newEventCard--Title">Add Event</div>
          <div className="newEventCard--Body">
            <FontAwesomeIcon size="5x" icon={faPlusCircle} />
          </div>
        </div>
      </LinkContainer>
    );
  }
}

export default NewEventCard;
