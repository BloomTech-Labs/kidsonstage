/* eslint-disable no-console, no-class-assign, jsx-a11y/label-has-for, react/forbid-prop-types */
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

import './css/login.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import { Button, Input } from 'mdbreact';

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
          {/* <div className="login--icon_container">
            <div className="login--icon" />
          </div> */}
          <div className="login--form">
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <p className="h5 text-center mb-4">Sign in</p>
              <Input
                label="Type your email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
              <Input
                label="Type your password"
                icon="lock"
                group
                type="password"
                validate
              />
              <div className="text-center">
                <Button block color="success" action="submit">
                  Login
                </Button>
                {this.renderAlert()}
              </div>
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
