import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import './css/events.css';

import normalizeDate from './normalizers/normalizeDate';

import { getEvent, getGroups } from '../actions';

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
    return (
      <LinkContainer
        exact
        to="/events/details"
        onClick={() => {
          sessionStorage.setItem('eventId', this.state.id);
          this.props.setEvent(this.state.id);
          this.props.setGroups(this.state.id);
          console.log(`EventCard click eventId ${this.state.id}`);
        const admin = (Number(sessionStorage.getItem('id')) === this.props.owner) ? 1 : 0;
        sessionStorage.setItem('admin', admin);
          document.location.reload(false);
        }}
      >
        <div className="eventCard--Container">
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
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
  setEvent: id => dispatch(getEvent(id)),
  setGroups: id => dispatch(getGroups(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(EventCard);
