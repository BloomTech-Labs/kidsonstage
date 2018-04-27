import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import './css/subscriberBox.css';
import { getEvent, invitedEventSubscribe, getEventInvites, ROOT_URL } from '../actions';
/* eslint-disable react/prefer-stateless-function, no-console */
class SubscriberBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: -1,
      error: undefined,
      errorArray: [],
      eventCode: '',
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
          <span>
            <input
              type="text"
              placeholder="Event Code"
              value={this.state.eventCode}
              onChange={(event) => {
                // console.log(`changed value ${event.target.value}`);
                this.setState({
                  eventCode: event.target.value,
                });
              }}
            />
            <button
              id="getEventId"
              onClick={() => {
                const { eventCode } = this.state;
                if (eventCode.length > 0) {
                  const url = `${ROOT_URL}/invites/${eventCode}`;
                  axios
                    .get(url)
                    .then((response) => {
                      // console.log(JSON.stringify(response.data[0], null, 2));
                      this.setState({
                        eventId: response.data[0].id,
                      });
                    })
                    .catch((err) => {
                      this.setState({
                        error: err,
                        errorArray: Object.keys(err).map(key => `${key}: ${err[key]}`),
                      });
                    });
                }
              }}
            >
              Get Event Id
            </button>
          </span>
          <div>
            <h2>Event ID {this.state.eventId}</h2>
            <button id="submit" type="submit">Add Event</button>
          </div>
          {this.state.error !== undefined &&
            <ul>
              {this.state.errorArray.forEach(error =>
                <li key={error}>{error}</li>)}
            </ul>
          }
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
