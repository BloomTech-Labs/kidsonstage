import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './css/navbar.css';

export default class NavBar extends Component {
  render() {
    return (
      <div className="Section_NavBar">
        <ul>
          <button className="Nav_button">
            <Link to="/">Home</Link>
          </button>
          <button className="Nav_button">
            <Link to="/signup">Sign Up</Link>
          </button>
          <button className="Nav_button">
            <Link to="/signin">Sign In</Link>
          </button>
          <button className="Nav_button">
            <Link to="/settings">Settings</Link>
          </button> 
          <button className="Nav_button">
            <Link to="/events">Events</Link>
          </button>                    
          {/* <button className="Nav_button"><Link to="/signout">Sign Out</Link></button> need to determine signed in state for this */}
        </ul>
      </div>
    );
  }
}
