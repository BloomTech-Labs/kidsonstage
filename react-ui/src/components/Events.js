import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent, deleteEvent, getEvents, getGroups } from '../actions';
import formatTime from './normalizers/normalizeTime';
import './css/events.css';

/* eslint-disable react/prop-types, no-console */
/*
{
  "clubName": "Mark Club",
  "members": [
    {
      "firstName": "Mark",
      "lastName": "Oliver",
      "hobbies": [
        "redux",
        "react"
      ]
    },
  }


  "userId": "5",
  "events": [
    {
      "title": "Mark",
      "date": "April 1st, 2018 8:00AM",
      "groups": [
        {id: 1, eventId, name, time, completed},

      ]
    },
  }

     tbl.increments('id').primary(); // primary key
        tbl.integer('eventId').references('id').inTable('events');
        tbl.string('name',100).notNullable();
        tbl.dateTime('time').notNullable();
        tbl.boolean('completed').notNullable().defaultTo(false);
*/

const renderGroups = ({
  props, fields, eventId, meta: { error },
}) => {
  props.load(eventId);
  return (
    <ul>
      <li>
        <button type="button" onClick={() => fields.push()}>
        Add Group
        </button>
      </li>
      {fields.map((group, index) => (
        <li key={group.name}>
          <button
            type="button"
            title="Remove Group"
            onClick={() => {
            fields.remove(index);
            props.deleteGroup(group.id);
          }}
          />
          <Field
            name="name"
            type="text"
            component="input"
            label={`${index + 1}) `}
            placeholder="name"
          />
          <Field
            name="time"
            type="text"
            placeholder="HH:MM"
            normalize={formatTime}
            component="input"
          />
          <Field name="completed" label="completed" component="input" type="checkbox" className="checkbox" />
          {/* todo replace check box with flag image */}
        </li>
    ))}
      {error && <li className="error">{error}</li>}
    </ul>);
};

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


const renderAdminEvents = ({ fields, meta: { error, submitFailed } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Event
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((event, index) => (
      <li key={event.eventDate || index}>
        <button
          type="button"
          title="Remove Event"
          onClick={() => fields.remove(index)}
        />
        <Field
          name={`${event}.title`}
          type="text"
          component="input"
          placeholder="title"
        />
        <Field
          name={`${event}.eventDate`}
          type="text"
          component="input"
          placeholder="Event Date"
        />
        <Field name="activated" label="activated" component="input" type="checkbox" className="checkbox" />
        <Field name="completed" label="completed" component="input" type="checkbox" className="checkbox" />

        <FieldArray name={`${event}.groups`} component={renderGroups} eventId={event.id} />

      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>
);

const EventsForm = (props) => {
  const handleFormSubmit = (values) => {
    console.log(JSON.stringify(values));
  };
  const {
    load, handleSubmit, pristine, /* reset, */ submitting,
  } = props;
  load();
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FieldArray name="admin" component={renderAdminEvents} />
      <button type="submit" disabled={submitting || pristine}>
          Save
      </button>
    </form>
  );
};
EventsForm.propTypes = {
  load: PropTypes.func.isRequired,
};

// const mapStateToProps = state => ({
//   error: state.auth.error,
// });

// export default reduxForm({
//   form: 'eventsForm',
//   touchOnBlur: true,
//   fields: ['title', 'eventDate'],
// })(connect(mapStateToProps, { addEvent })(renderAdminEvents));
/*

  "userId": "5",
  "events": [
    {
      "title": "Mark",
      "date": "April 1st, 2018 8:00AM",
      "groups": [
        {id: 1, eventId, name, time, completed},

      ]
    },
  }
  */


// const addGroups = (state) => {
//   const { events } = state;
//   events.forEach((event) => {
//     getGroups(event);
//   });
//   return events;
// };

const Events = reduxForm({
  form: 'settings', // a unique identifier for this form
  touchOnBlur: true,
})(EventsForm);


// You have to connect() to any reducers that you wish to connect to yourself
export default connect(
  state => ({ initialValues: state.events }),
  { load: getEvents, addEvent, deleteEvent }, // bind account loading action creator
)(Events);


const Groups = reduxForm({
  form: 'groups', // a unique identifier for this form
  touchOnBlur: true,
})(renderGroups);


// You have to connect() to any reducers that you wish to connect to yourself
connect(
  state => ({ initialValues: state.groups }),
  { load: getGroups }, // bind account loading action creator
)(Groups);
