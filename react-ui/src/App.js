/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './components/Home';
import NavBar from './components/NavBar';
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
    fetch('/api')
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
      </div>
    );
  }
}

export default App;
