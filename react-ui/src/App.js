import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import logo from './logo.svg';
import Landing from './components/Landing';
import './App.css';

/* eslint-disable react/no-unused-state,indent, no-tabs */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   message: null,
    //   fetching: true,
    };
  }

  // componentDidMount() {
  // 	fetch('/api')
  // 		.then(response => {
  // 			if (!response.ok) {
  // 				throw new Error(`status ${response.status}`);
  // 			}
  // 			return response.json();
  // 		})
  // 		.then(json => {
  // 			this.setState({
  // 				message: json.message,
  // 				fetching: false
  // 			});
  // 		})
  // 		.catch(e => {
  // 			this.setState({
  // 				message: `API call failed: ${e}`,
  // 				fetching: false
  // 			});
  // 		});
  // }

  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Landing} />
      </div>
    );
  }
}

export default App;
