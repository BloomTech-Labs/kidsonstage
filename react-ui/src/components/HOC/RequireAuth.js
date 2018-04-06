import React, { Component } from 'react';

export default (ComposedComponent) => {
  class RequireAuthentication extends Component {
    componentWillMount() {
      if (!sessionStorage.getItem('token')) {
        this.props.history.replace('/signin');
      }
    }
    render() {
      /* eslint-disable no-mixed-operators */
      const token = sessionStorage.getItem('token');
      return (token && (token.length > 0)) === true ? (
        <ComposedComponent />
      ) : (
        <div />
      );
    }
  }
  return RequireAuthentication;
};
