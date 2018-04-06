import React from 'react';
import { Field, FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent, deleteEvent, getEvents, getGroups } from '../actions';
import formatTime from './normalizers/normalizeTime';
import './css/events.css';

/* eslint-disable react/prop-types, no-console, no-param-reassign,
        jsx-a11y/no-noninteractive-element-interactions */
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
  // if (eventId) props.load(eventId);
  return (
    <ul>
      <li key={-1}>
        <button type="button" onClick={() => fields.push()}>
        Add Group
        </button>
      </li>
      {fields.map((group, index) => (
        <li key={`${group}.Remove`}>
          <button
            type="button"
            title="Remove Group"
            onClick={() => {
            if (group.id) props.deleteGroup(group.id);
            fields.remove(index);
          }}
          />
          <Field
            name={`${group}.name`}
            type="text"
            component="input"
            label={`${index + 1}) `}
            placeholder="name"
          />
          <Field
            name={`${group}.time`}
            type="text"
            placeholder="HH:MM"
            normalize={formatTime}
            component="input"
          />
          <Field name={`${group}.completed`} label="completed" component="input" type="checkbox" className="checkbox" />
          {/* todo replace check box with flag image */}
        </li>
    ))}
      {error && <li key={-2} className="error">{error}</li>}
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


const renderAdminEvents = ({ props, fields, meta: { error, submitFailed } }) => (
  <ul>
    <li key={-1}>
      <button type="button" onClick={() => fields.push()}>
        Add Event
      </button>
      {submitFailed && error && <span>{error}</span>}
    </li>
    {fields.map((event, index) => (
      <li key={`${event}Remove`}>
        <button
          type="button"
          title="Remove Event"
          onClick={() => {
            if (event.id) props.deleteEvent(event.id);
            fields.remove(index);
          }}
        />
        <Field
          name={`${event}.title`}
          type="text"
          component="input"
          placeholder="title"
        />
        <Field
          name={`${event}.date`}
          type="text"
          component="input"
          placeholder="Event Date"
        />
        <Field name={`${event}.activated`} label="activated" component="input" type="checkbox" className="checkbox" />
        <Field name={`${event}completed`} label="completed" component="input" type="checkbox" className="checkbox" />

        <FieldArray name={`${event}.ga`} component={renderGroups} eventId={event.id} />
      </li>
    ))}
    {error && <li className="error">{error}</li>}
  </ul>);

const onKeyPress = (event) => {
  // console.log(`kp event ${JSON.stringify(event.which)}`);
  if (event.which === 13 /* Enter */) {
    event.preventDefault();
  }
};
/*
{"admin":[{"title":"event 1","date":"1-1-1","fa":[{"name":"group 1-1","time":"0101"}]}]}


{"admin":[{"title":"Event 1","date":"1-1-2018","ga":[{"name":"group 1-1","time":"0101"},
{"name":"group 2-2","time":"0202"},{"name":"group 3-3","time":"0303"}]},
{"title":"Event 2","date":"2-2-2018","ga":[{"name":"group 2-1","time":"0404"},
{"name":"group 3-1","time":"0505"}]}]}
*/

const EventsForm = (props) => {
  const handleFormSubmit = (values) => {
    console.log(JSON.stringify(values));
  };
  const {
    /* load, */ handleSubmit, pristine, /* reset, */ submitting,
  } = props;
  // load();
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} onKeyPress={onKeyPress} >
      <FieldArray name="admin" component={renderAdminEvents} />
      <button type="submit" disabled={submitting || pristine} onKeyPress={onKeyPress} >
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
export default Events;


// You have to connect() to any reducers that you wish to connect to yourself
// export default connect(
//   state => ({ initialValues: state.events || [] }),
//   { load: getEvents, addEvent, deleteEvent }, // bind account loading action creator
// )(Events);


// const Groups = reduxForm({
//   form: 'groups', // a unique identifier for this form
//   touchOnBlur: true,
// })(renderGroups);


// You have to connect() to any reducers that you wish to connect to yourself
// connect(
//   state => ({ initialValues: state.groups || [] }),
//   { load: getGroups }, // bind account loading action creator
// )(Groups);
