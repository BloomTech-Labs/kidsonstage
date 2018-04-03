import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import normalizePhone from './normalizers/normalizePhone';
import './css/userSettings.css';
import { updateUser } from '../actions';
import { load as loadAccount } from './account';

/* eslint-disable no-console, no-class-assign, jsx-a11y/label-has-for, react/prop-types, object-curly-newline */
class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValues: { ...this.props.initialValues },
    };
  }
  handleFormSubmit = ({ username = 'mark', email = 'mark@gmail', phoneNumber = '9999999999',
    password = 'p', confirmPassword = 'p', byPhone, byEmail }) => {
    this.props.register(
      {
        username, email, phoneNumber, password, confirmPassword, byPhone, byEmail,
      },
      this.props.history,
    );
  };


  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };

  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    // this.initialValues = {
    //   username: 'mark',
    //   email: 'mark@gmail',
    //   phoneNumber: '9999999999',
    //   password: 'p',
    //   confirmPassword: 'p',
    //   byPhone: true,
    //   byEmail: false };
    console.log(`initialValues: ${this.props.initialValues.username}`);

    const email = value =>
      (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined);
    const aol = value =>
      (value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined);
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)} id="new-user-form" >
        {/* <div className="flex-center-div">
          <label className="new-user-label">Username:</label>
          <Field
            name="username"
            component="input"
            type="text"
            className="new-user-inputText"
            placeholder="User Name"
            id="new-user-username"
          />
        </div> */}
        <div className="flex-center-div">
          <label className="new-user-label">Email</label>
          <Field
            name="email"
            component="input"
            validate={email}
            warn={aol}
            placeholder="Email"
            className="new-user-inputText"
            id="new-user-email"
          />
        </div>
        <div className="flex-center-div">
          <label className="new-user-label">Phone Number</label>
          <Field
            name="phoneNumber"
            className="new-user-inputText"
            component="input"
            type="text"
            placeholder="Phone Number"
            normalize={normalizePhone}
            id="new-user-phone"
          />
        </div>
        <div className="flex-center-div">
          <label className="new-user-label">Old Password:</label>
          <Field
            name="password"
            component="input"
            type="password"
            className="new-user-inputText new-user-password"
            placeholder="Password"
          />
        </div>
        <div className="flex-center-div">
          <label className="new-user-label">New Password:</label>
          <Field
            name="newPassword"
            component="input"
            type="password"
            className="new-user-inputText new-user-password"
            placeholder="New Password"
          />
        </div>
        <p id="new-user-contacted" >How would you like to be contacted?</p>
        <div className="flex-center-div" id="new-user-checkboxes" >
          <div id="new-user-texts">
            <Field name="byPhone" id="byPhone" component="input" type="checkbox" className="checkbox" />
            <span>Texts?</span>
          </div>
          <div id="new-user-emails">
            <Field name="byEmail" id="byEmail" component="input" type="checkbox" className="checkbox" />
            <span>Email?</span>
          </div>
        </div>
        <div className="flex-center-div">
          <button
            className="new-user-action-button"
            id="new-user-sign-up"
            type="submit"
            disabled={pristine || submitting}
          >
          Save
          </button>
          <button
            className="new-user-action-button"
            id="new-user-clear-values"
            type="button"
            disabled={pristine || submitting}
            onClick={reset}
          >Clear Values
          </button>
        </div>
      </form>
    );
  }
}
// const mapStateToProps = state => ({
//   error: state.auth.error,
// });

// export default reduxForm({
//   touchOnBlur: true,
//   form: 'settings',
//   fields: ['originalUsername', 'originalPassword', 'username',
//     'email', 'phoneNumber', 'password',
//     'confirmPassword', 'byPhone', 'byEmail'],
// })(connect(mapStateToProps, { updateUser })(Settings));


// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
Settings = reduxForm({
  form: 'settings', // a unique identifier for this form
  touchOnBlur: true,
})(Settings);

// You have to connect() to any reducers that you wish to connect to yourself
Settings = connect(
  state => ({
    initialValues: {
      username: 'mark',
      email: 'mark@gmail',
      phoneNumber: '9999999999',
      password: 'p',
      confirmPassword: 'p',
      byPhone: true,
      byEmail: false }, // pull initial values from account reducer
    error: state.auth.error,
  }),
  { load: loadAccount, updateUser }, // bind account loading action creator
)(Settings);

export default Settings;
