/* eslint-disable no-console, no-class-assign, jsx-a11y/label-has-for, react/forbid-prop-types */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

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
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset>
          <label>Username:</label>
          <Field name="username" component="input" type="text" />
        </fieldset>
        <fieldset>
          <label>Password:</label>
          <Field name="password" component="input" type="password" />
        </fieldset>
        <button action="submit">Sign In</button>
        {this.renderAlert()}
      </form>
    );
  }
}

SignIn.defaultProps = {
  error: null,
};
SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  error: state.auth.error,
  authenticated: state.auth.authenticated,
});

SignIn = connect(mapStateToProps, { login })(SignIn);
/* eslint-disable no-class-assign */
// UserSignIn = connect(mapStateToProps, { login })(UserSignIn);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password'],
})(SignIn);

// export default reduxForm({
//   form: 'signin',
//   fields: ['username', 'password'],
// })(UserSignIn);
