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
import SignUp from './components/NewUser';
import Settings from './components/Settings';
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
        <Route path="/settings" component={RequireAuth(Settings)} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
