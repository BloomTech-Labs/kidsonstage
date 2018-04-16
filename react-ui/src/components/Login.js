/* eslint-disable no-console, no-class-assign, jsx-a11y/label-has-for, react/forbid-prop-types */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

import './css/login.css';

class SignIn extends Component {
  handleFormSubmit = ({ username, password }) => {
    // console.log(`username: ${username} password: ${password}`);
    this.props.login({ username, password }, this.props.history);
  };

  renderAlert() {
    if (!this.props.error) return null;
    return <h3>{this.props.error}</h3>;
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="login--container">
        <div className="login--form_container">
          <div className="login--icon"></div>
          <div className="login--form">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <fieldset>
                
                <Field className="login--form_field" name="username" component="input" type="text" placeholder="Username"/>
              </fieldset>
              <fieldset>
                
                <Field className="login--form_field" name="password" component="input" type="password" placeholder="Password" />
              </fieldset>
              <button action="submit">Sign In</button>
              {this.renderAlert()}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

SignIn.defaultProps = {
  error: null
};
SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  error: state.auth.error,
  authenticated: state.auth.authenticated
});

SignIn = connect(mapStateToProps, { login })(SignIn);
/* eslint-disable no-class-assign */
// UserSignIn = connect(mapStateToProps, { login })(UserSignIn);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password']
})(SignIn);

// export default reduxForm({
//   form: 'signin',
//   fields: ['username', 'password'],
// })(UserSignIn);
