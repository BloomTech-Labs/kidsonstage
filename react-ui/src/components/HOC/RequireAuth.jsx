import React, { Component } from 'react';

export default (ComposedComponent) => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!localStorage.getItem('token')) {
        this.props.history.replace('/signin');
      }
    }
    render() {
      /* eslint-disable no-mixed-operators */
      return localStorage.getItem('token').length > 0 === true ? (
        <ComposedComponent />
      ) : (
        <div />
      );
    }
  }
  return RequireAuthentication;
};
