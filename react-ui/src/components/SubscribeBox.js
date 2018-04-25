import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './css/subscriberBox.css';
import { getEvent, invitedEventSubscribe, getEventInvites } from '../actions';
/* eslint-disable react/prefer-stateless-function, no-console */
class SubscriberBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: -1,
    };
  }
  componentDidMount() {
    this.props.getEventInvites();
    this.userId = Number(sessionStorage.getItem('id'));
  }
  componentWillReceiveProps(nextProps) {
    const newEvs = nextProps.eventInvites.filter(eV =>
      this.props.eventInvites.findIndex(ceV =>
        (ceV.eventId === eV.eventId) && (ceV.userId === this.userId)) < 0);
    newEvs.forEach(nEv => this.addInvitedEvent(nEv.eventId));
  }
  addInvitedEvent = (eventId) => {
    this.props.getEvent(eventId, 2);
  }
  render() {
    return (
      <div className="subscriberBox--form_container">
        <Navbar className="subscriberBox--box_navbar" dark>
          <NavbarBrand tag="span">Subscribe to Event</NavbarBrand>
        </Navbar>

        <form onSubmit={(e) => {
          // console.log(`SubscriberBox onSubmit eventId ${this.state.eventId}`);
          if (this.state.eventId > 0) {
            // addInvitedEvent(this.state.eventId);
            this.props.invitedEventSubscribe(this.state.eventId);
          }
          e.preventDefault();
        }}
        >
          <input
            type="number"
            placeholder="Event Code"
            onBlur={(event) => {
              // console.log(`SubscriberBox ${event.target.value}`);
              const eventId = Number(event.target.value);
              if (eventId > 0) {
                this.setState({
                  eventId,
                });
              }
          }}
          /><br />
          <button type="submit">Add Event</button>
        </form>

      </div>

    );
  }
}
SubscriberBox.propTypes = {
  getEvent: PropTypes.func.isRequired,
  invitedEventSubscribe: PropTypes.func.isRequired,
  getEventInvites: PropTypes.func.isRequired,
  eventInvites: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default connect(
  state => ({
    eventInvites: state.eventInvites,
  }),
  // dispatch => ({ loadEvent: eventId => dispatch(getEvent(eventId)) }),
  { getEvent, invitedEventSubscribe, getEventInvites },
)(SubscriberBox);
