import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions';

/* eslint-disable jsx-a11y/label-has-for, react/forbid-prop-types */

class UserSignIn extends Component {
    handleFormSubmit = ({ username, password }) => {
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

UserSignIn.defaultProps = {
  error: null,
};
UserSignIn.propTypes = {
  login: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  error: state.auth.error,
  authenticated: state.auth.authenticated,
});

/* eslint-disable no-class-assign */
UserSignIn = connect(mapStateToProps, { login })(UserSignIn);

export default reduxForm({
  form: 'signin',
  fields: ['username', 'password'],
})(UserSignIn);
