import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { getEvent, getGroups, getPartGroups } from '../actions';
import './css/events.css';

import normalizeDate from './normalizers/normalizeDate';

import { Navbar, NavbarBrand } from 'mdbreact';

class EventCard extends Component {
  constructor(props) {
    super(props);
    const { id } = props;
    this.state = { id };
    console.log(`EventCard id ${id}`);
  }

  componentDidMount() {
    // this.props.setEvent(this.state.id);
    // this.props.setGroups(this.state.id);
  }

  render() {
    // console.log(`eventCard pre-render return id ${this.state.id}`);
    const admin = (Number(sessionStorage.getItem('id')) === this.props.owner) ? 1 : 0;
    const queryRoute = `/events/details?eventId=${this.props.id}&admin=${admin}`;
    return (
      <LinkContainer
        exact
        to={queryRoute}
        onClick={() => {
          sessionStorage.setItem('eventId', this.state.id); // not used for EventDetail
          console.log(`EventCard click eventId ${this.state.id}`);
          this.props.setEvent(this.state.id);
          this.props.setGroups(this.state.id);
          this.props.setParts(this.state.id);
        // sessionStorage.setItem('admin', admin);
          document.location.reload(false);
        }}
      >
        <div className="eventCard--Container">
          {process.env.REACT_APP_ShowEventId === 'true' &&
          <h2>{this.state.id}</h2>
          }
          <Navbar className="eventCard--box_navbar" dark>
            <NavbarBrand tag="span">{this.props.title}</NavbarBrand>
          </Navbar>
          

          {/* <div className="eventCard--Title"></div> */}
          <div className="eventCard--Date">{normalizeDate(this.props.eventDate)}<br />
          {/* Active Status: {this.props.title === true ? "TRUE" : "FALSE"} */}
          </div>
        </div>
      </LinkContainer>
    );
  }
}

// export default EventCard;
const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch => ({
  setEvent: id => dispatch(getEvent(id, 1)),
  setGroups: id => dispatch(getGroups(id)),
  setParts: id => dispatch(getPartGroups(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
