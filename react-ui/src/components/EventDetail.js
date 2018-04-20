import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Navbar, NavbarBrand } from 'mdbreact';
// import PropTypes from 'prop-types';
import { getEvent } from '../actions';
import RenderGroups from './EventDetailGroups';
import './css/eventDetail.css';
import normalizeDate from './normalizers/normalizeDate';

// import TextField from 'material-ui/TextField';

import Billing from './stripe';
/* eslint-disable react/prop-types, no-console, no-param-reassign,
        jsx-a11y/no-noninteractive-element-interactions */
/*

     tbl.increments('id').primary(); // primary key
        tbl.integer('eventId').references('id').inTable('events');
        tbl.string('name',100).notNullable();
        tbl.dateTime('time').notNullable();
        tbl.boolean('completed').notNullable().defaultTo(false);
*/

/*
    return knex.schema.createTable('events', function(tbl) {
      tbl.increments('id').primary(); // primary key
      tbl
        .integer('owner')
        .references('id')
        .inTable('users');
      tbl.string('title', 100).notNullable();
      tbl.dateTime('eventDate').notNullable();
      tbl.boolean('activated').notNullable().defaultTo(false);
      tbl.boolean('completed').notNullable().defaultTo(false);
    });
*/

const EventsForm = props => {
  const { load } = props;
  // const eventId = sessionStorage.getItem('eventId');
  // const eventId = (id <= 0) ? sessionStorage.getItem('eventId') : id;
  const eventId = Number(sessionStorage.getItem('eventId'));
  const admin = Number(sessionStorage.getItem('admin'));
  // console.log(`Event Detail history? ${props.history}`);
  // console.log(`Event Detail eventId: ${eventId}`);
  // console.log(`loadEvent type ${typeof loadEvent}`);
  // console.log(`getEvent type ${typeof getEvent}`);
  if (eventId > 0) load(eventId);
  // console.log(`event ${JSON.stringify(event)}`);
  return (
    <div className="eventDetail--container">
      <div className="eventDetail--form_container">
        <Navbar className="eventDetail--box_navbar" dark>
          <NavbarBrand tag="span">Event Info</NavbarBrand>
        </Navbar>
        {eventId > 0 && (
          <div className="eventDetail--box_content">
            Event Name:{' '}
            <Field
              name="event.title"
              type="text"
              component="input"
              placeholder="title"
              readOnly="true"
            />
            <br />
            Event Date:{' '}
            <Field
              name="event.formattedDate"
              type="text"
              component="input"
              placeholder="Event Date"
              readOnly="true"
            />
          </div>
        )}
      </div>
      <div className="eventDetail--form_container">
        <Navbar className="eventDetail--box_navbar" dark>
          <NavbarBrand tag="span">Group Info</NavbarBrand>
        </Navbar>
        <RenderGroups eventId={eventId} admin={admin} history={props.history} />
      </div>
      {admin > 0 && (
        <div className="eventDetail--form_container">
          <Navbar className="eventDetail--box_navbar" dark>
            <NavbarBrand tag="span">Event Status</NavbarBrand>
          </Navbar>
          <br />
          <div className="eventDetail--box_content">
            {/* Display stripe payment box if event isn't activated */}

            {props.initialValues.event.activated === true ? (
              <div className="eventDetail--activated">ACTIVATED</div>
            ) : (
              <Billing eventId={eventId} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};
// EventsForm.propTypes = {
//   // loadEvent: PropTypes.func.isRequired,
// };

const EventDetail = reduxForm({
  form: 'eventdetail', // a unique identifier for this form
  touchOnBlur: true
})(EventsForm);
// export default EventDetail;

const nomalizeEventDate = event => {
  if (event && event.eventDate) {
    const newDate = normalizeDate(event.eventDate);
    // console.log(`eventDate: ${event.eventDate} newDate: ${newDate}`);
    if (newDate) {
      event.formattedDate = newDate;
      // console.log(`set formattedDate: ${event.formattedDate}`);
    }
  }
  return event;
};
export default connect(
  state => ({
    initialValues: { event: nomalizeEventDate(state.event) }
  }),
  dispatch => ({ load: eventId => dispatch(getEvent(eventId)) })
)(EventDetail);
// export default connect(state => ({
//   initialValues: { event: state.event },
// }), { load: eventId => getEvent(eventId) })(EventDetail);
