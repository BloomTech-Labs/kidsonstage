/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import RequireAuth from './components/HOC/RequireAuth';
import withTracker from './components/HOC/withTracker';

import Home from './components/Home';
import NavBar from './components/NavBar';
import Settings from './components/EditAccount';
import SignIn from './components/Login';
import SignOut from './components/LogOut';
import Register from './components/Register';
import Users from './components/Users';
import Events from './components/Events';
import EventsNew from './components/EventsNew';
// import RfEvents from './components/RfEvents';
import EventDetail from './components/EventDetail';
import Billing from './components/stripe';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
        this.setState({
          message: json.message,
          fetching: false
        });
      })
      .catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      });
  }

  checkAuth() {
    const token = sessionStorage.getItem('token');
    const id = sessionStorage.getItem('id');
    
    if (!id || !token) {
      return false;
      // return;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="App">
        <NavBar auth={this.checkAuth()} />
        <div className="App--Body">
          {/* <div className="sideNavBar--Container">SideNavBar</div> */}
          <div>
            <Route exact path="/" render={() => (withTracker(<Home auth={this.checkAuth()} />))} />
            <Route path="/signin" component={withTracker(SignIn)} />
            <Route path="/users" component={withTracker(RequireAuth(Users))} />
            <Route path="/signout" component={withTracker(RequireAuth(SignOut))} />
            <Route path="/signup" component={withTracker(Register)} />
            <Route path="/settings" component={withTracker(RequireAuth(Settings))} />
            <Route exact path="/events" component={withTracker(RequireAuth(Events))} />
            {/* <Route path="/rfevents" component={withTracker(RequireAuth(RfEvents))} /> */}
            <Route
              exact
              path="/events/new"
              component={withTracker(RequireAuth(EventsNew))}
            />
            <Route
              exact
              path="/events/details"
              component={withTracker(RequireAuth(EventDetail))}
            />
            <Route
              exact
              path="/events/purchase"
              component={withTracker(RequireAuth(Billing))}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
