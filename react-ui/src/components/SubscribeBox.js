import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './css/subscriberBox.css';
import { getEvent } from '../actions';
/* eslint-disable react/prefer-stateless-function, no-console */
class SubscriberBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: -1,
    };
  }
  render() {
    return (
      <div className="subscriberBox--form_container">
        <Navbar className="subscriberBox--box_navbar" dark>
          <NavbarBrand tag="span">Subscribe to Event</NavbarBrand>
        </Navbar>

        <form onSubmit={(e) => {
          // console.log(`SubscriberBox onSubmit eventId ${this.state.eventId}`);
          if (this.state.eventId > 0) this.props.getEvent(this.state.eventId, 2);
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
};
export default connect(
  () => ({
  }),
  // dispatch => ({ loadEvent: eventId => dispatch(getEvent(eventId)) }),
  { getEvent },
)(SubscriberBox);
