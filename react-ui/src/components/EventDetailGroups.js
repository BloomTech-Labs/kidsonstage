import React from 'react';
import { Field, reduxForm, FieldArray } from 'redux-form';
import { connect } from 'react-redux';
import formatTime from './normalizers/normalizeTime';
import { getGroups } from '../actions';
/* eslint-disable react/prop-types, no-console, no-param-reassign,
        jsx-a11y/no-noninteractive-element-interactions, arrow-body-style */
const renderGroups = ({
  props, fields, eventId, load, meta: { error },
}) => {
  if (eventId) load(eventId);
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
const onKeyPress = (event) => {
  // console.log(`kp event ${JSON.stringify(event.which)}`);
  if (event.which === 13 /* Enter */) {
    event.preventDefault();
  }
};
const EventDetailsGroups = (props) => {
  const handleFormSubmit = (values) => {
    values.groupFA.forEach((group) => {
      if (group.dirty) console.log('dirty');
      console.log(`detail group ${JSON.stringify(group)} || ${Object.keys(group)} `);
    });
  };
  const {
    handleSubmit, load, pristine, /* reset, */ submitting,
  } = props;
  const eventId = props.eventId || 2;
  // console.log(`Groups load type ${typeof load}`);
  // console.log(`Groups getGroups type ${typeof getGroups}`);
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} onKeyPress={onKeyPress} >
      <FieldArray name="groupFA" component={renderGroups} eventId={eventId} load={load} />
      <button type="submit" disabled={submitting || pristine} onKeyPress={onKeyPress} >
          Save
      </button>
    </form>
  );
};
const EventDetail = reduxForm({
  form: 'eventdetailGroups', // a unique identifier for this form
  touchOnBlur: true,
})(EventDetailsGroups);
// export default EventDetail;

export default connect(
  state => ({
    initialValues: { groupFA: state.groups },
  }),
  { load: getGroups },
)(EventDetail);
