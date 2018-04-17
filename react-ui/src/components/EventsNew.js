import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addEvent } from '../actions';
import './css/events.css';

/* eslint-disable react/forbid-prop-types */
class EventsNew extends Component {
  handleFormSubmit = ({
    title, date, activated = false, completed = false,
  }) => {
    this.props.save(
      {
        title, date, activated, completed,
      },
      this.props.history.push('/events'),
    );
  };

  render() {
    const {
      handleSubmit, pristine, submitting,
    } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)} id="new-event-form" >
        <Field
          name="title"
          type="text"
          component="input"
          label="title"
          placeholder="title"
        />
        <Field
          name="date"
          type="text"
          component="input"
          label="date"
          placeholder="date"
        />
        <button
          className="new-user-action-button"
          id="new-user-sign-up"
          type="submit"
          disabled={pristine || submitting}
        >
          Save
        </button>
      </form>
    );
  }
}
EventsNew.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  save: PropTypes.func.isRequired,
};
// export default EventsNew;
const NewEvent = reduxForm({
  form: 'newEvent', // a unique identifier for this form
  touchOnBlur: true,
})(EventsNew);

export default connect(() => ({
}), dispatch => ({ save: event => dispatch(addEvent(event)) }
))(NewEvent);
