import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import App from './App';
import SignIn from './components/SignIn';
import Users from './components/users';
import SignOut from './components/signout';
/* eslint-disable camelcase */
import Sign_Up from './components/NewUser';
import SignUp from './components/signup';
import RequireAuth from './components/HOC/RequireAuth';

import reducers from './reducers';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/signin" component={SignIn} />
        <Route path="/users" component={RequireAuth(Users)} />
        <Route path="/signout" component={SignOut} />
        <Route path="/signup" component={SignUp} />
        <Route path="/sign-up" component={Sign_Up} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
