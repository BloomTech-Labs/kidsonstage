import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

import Navbar from './navbar/navbar';
//import Home from './home'; change this to our file configuration

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      fetching: true
    };
  }

  componentDidMount() {
    fetch('/api')
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
      }).catch(e => {
        this.setState({
          message: `API call failed: ${e}`,
          fetching: false
        });
      })
  }

  render() {
		return (
			<div className="App">
				<Navbar />
				<p> Kid On Stage Skeletor Site </p>
				{/* <Route path="/" component={ Home }/> */}
			</div>
		);
	}
}

export default App;
