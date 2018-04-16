/* eslint-disable jsx-a11y/label-has-for, react/prop-types, object-curly-newline */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import normalizePhone from './normalizers/normalizePhone';
import { register } from '../actions';
import './css/register.css';

// const { DOM: { input /* select, textarea */ } } = React;

class Register extends Component {
  handleFormSubmit = ({
    username = 'mark',
    email = 'mark@gmail',
    phoneNumber = '9999999999',
    password = 'p',
    confirmPassword = 'p',
    byPhone,
    byEmail
  }) => {
    this.props.register(
      {
        username,
        email,
        phoneNumber,
        password,
        confirmPassword,
        byPhone,
        byEmail
      },
      this.props.history
    );
  };

  renderAlert = () => {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  };
  render() {
    const { handleSubmit, pristine, reset, submitting } = this.props;
    // const renderField = ({
    //   input,
    //   label,
    //   type,
    //   meta: { touched, error, warning },
    // }) => (
    //   <div>
    //     <label>{label}</label>
    //     <div>
    //       <input {...input} placeholder={label} type={type} />
    //       {touched &&
    //         ((error && <span>{error}</span>) ||
    //           (warning && <span>{warning}</span>))}
    //     </div>
    //   </div>
    // );
    const email = value =>
      value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;
    const aol = value =>
      value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined;
    return (
      <div className="register--container">
        <div className="register--form_container">
          <div className="register--icon" />
          <div className="register--form">
            <form
              onSubmit={handleSubmit(this.handleFormSubmit)}
              id="submit-button"
            >
              <fieldset>
                <Field
                  className="register--form_field"
                  name="username"
                  component="input"
                  type="text"
                  placeholder="User Name"
                  //id="username"
                />
              </fieldset>
              <fieldset>
                <Field
                  className="register--form_field"
                  name="email"
                  component="input"
                  validate={email}
                  warn={aol}
                  placeholder="Email"
                  //id="email"
                />
              </fieldset>
              <fieldset>
                <Field
                  className="register--form_field"
                  name="phone"
                  component="input"
                  type="text"
                  placeholder="Phone Number"
                  normalize={normalizePhone}
                  //id="phone"
                />
              </fieldset>
              <fieldset>
                <Field
                  className="register--form_field"
                  name="password"
                  component="input"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <fieldset>
                <Field
                  className="register--form_field"
                  name="confirmPassword"
                  component="input"
                  type="password"
                  placeholder="Confirm Password"
                />
              </fieldset>

              <div className="contact-text">
                How would you like to be contacted?
              </div>

              <fieldset>
                <Field
                  className="register--form_field"
                  name="byPhone"
                  id="byPhone"
                  component="input"
                  type="checkbox"
                  className="checkbox"
                />
                <span>Texts? </span>
                <Field
                  className="register--form_field"
                  name="byEmail"
                  id="byEmail"
                  component="input"
                  type="checkbox"
                  className="checkbox"
                />
                <span>Email?</span>
              </fieldset>
              <div className="register--form_buttons">
                <button type="submit" disabled={pristine || submitting}>
                  Sign Up
                </button>
                <button
                  type="button"
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error
});

export default reduxForm({
  form: 'newUser',
  touchOnBlur: true,
  fields: [
    'username',
    'email',
    'phone',
    'password',
    'confirmPassword',
    'byPhone',
    'byEmail'
  ]
})(connect(mapStateToProps, { register })(Register));
