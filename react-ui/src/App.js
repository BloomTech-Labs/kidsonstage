/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Settings from './components/EditAccount';
import SignIn from './components/Login';
import SignOut from './components/LogOut';
import Register from './components/Register';
import Users from './components/Users';
import RequireAuth from './components/HOC/RequireAuth';
import Events from './components/Events';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true,
    };
  }

  componentDidMount() {
    fetch('/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        this.setState({
          message: json.message,
          fetching: false,
        });
      })
      .catch((e) => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false,
        });
      });
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route path="/signin" component={SignIn} />
        <Route path="/users" component={RequireAuth(Users)} />
        <Route path="/signout" component={SignOut} />
        <Route path="/signup" component={Register} />
        <Route path="/settings" component={RequireAuth(Settings)} />
        <Route path="/events" component={RequireAuth(Events)} />
      </div>
    );
  }
}

export default App;