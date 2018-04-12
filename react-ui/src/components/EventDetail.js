import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getEvent } from '../actions';
import RenderGroups from './EventDetailGroups';
import './css/events.css';

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

const EventsForm = (props) => {
  const {
    loadEvent,
  } = props;
  //console.log(`eventId: ${eventId}`);
  // console.log(`loadEvent type ${typeof loadEvent}`);
  // console.log(`getEvent type ${typeof getEvent}`);
  // loadEvent(eventId);
  // console.log(`event ${JSON.stringify(event)}`);
  return (
    <div>
      <Field
        name="title"
        type="text"
        component="input"
        placeholder="title"
        readOnly="true"
      />
      <Field
        name="eventDate"
        type="text"
        component="input"
        placeholder="Event Date"
        readOnly="true"
      />
      <RenderGroups  />
    </div>

  );
};
EventsForm.propTypes = {
  // loadEvent: PropTypes.func.isRequired,
};

const EventDetail = reduxForm({
  form: 'eventdetail', // a unique identifier for this form
  touchOnBlur: true,
})(EventsForm);
// export default EventDetail;

export default connect(
  state => ({
    initialValues: state.event,
  })
)(EventDetail);