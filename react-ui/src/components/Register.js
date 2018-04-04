/* eslint-disable jsx-a11y/label-has-for, react/prop-types, object-curly-newline */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import normalizePhone from './normalizers/normalizePhone';
import { register } from '../actions';
import './css/Register.css';

// const { DOM: { input /* select, textarea */ } } = React;

class Register extends Component {
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
      (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined);
    const aol = value =>
      (value && /.+@aol\.com/.test(value)
        ? 'Really? You still use AOL for your email?'
        : undefined);
    return (
      <div className = "register-box">
      <form onSubmit={handleSubmit(this.handleFormSubmit)} id="submit-button" >
        <div className="register-form">
          <label className="label">Username:</label>
          <Field
            name="username"
            component="input"
            type="text"
            className="inputText"
            placeholder="User Name"
            //id="username"
          />
        </div>
        <div className="register-form">
          <label className="label">Email</label>
          <Field
            name="email"
            component="input"
            validate={email}
            warn={aol}
            placeholder="Email"
            className="inputText"
            //id="email"
          />
        </div>
        <div className="register-form">
          <label className="label">Phone Number</label>
          <Field
            name="phone"
            className="inputText"
            component="input"
            type="text"
            placeholder="Phone Number"
            normalize={normalizePhone}
            //id="phone"
          />
        </div>
        <div className="register-form">
          <label className="label">Password:</label>
          <Field
            name="password"
            component="input"
            type="password"
            className="inputText"
            placeholder="Password"
          />
        </div>
        <div className="register-form">
          <label className="label">Confirm Password:</label>
          <Field
            name="confirmPassword"
            component="input"
            type="password"
            className="inputText"
            placeholder="Confirm Password"
          />
        </div>
        <div className="contact-text" >How would you like to be contacted?</div>
        <div className="register-form" id="checkbox">
          <div id="text-preference">
            <Field name="byPhone" id="byPhone" component="input" type="checkbox" className="checkbox" />
            <span>Texts?</span>
          </div>
          <div id="email-preference">
            <Field name="byEmail" id="byEmail" component="input" type="checkbox" className="checkbox" />
            <span>Email?</span>
          </div>
        </div>
        <div className="register-form">
          <button className="button" type="submit" disabled={pristine || submitting}>Sign Up</button>
          <button className="button" type="button" disabled={pristine || submitting} onClick={reset}>Reset</button>
        </div>
      </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.auth.error,
});

export default reduxForm({
  form: 'newUser',
  touchOnBlur: true,
  fields: ['username', 'email', 'phone', 'password',
    'confirmPassword', 'byPhone', 'byEmail'],
})(connect(mapStateToProps, { register })(Register));
