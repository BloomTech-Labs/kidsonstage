import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import centerPng from './graphics/landing-center-graphic.png';
import './css/home.css';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // text: props.text,
    };
  }

  render() {
    return (
      <div className="home">
        <div className="carousel">
          <img src={centerPng} alt="carousel" />
        </div>
        <div className="home_text">
					Welcome to Kids On Stage! A queue notification system for any event!
        </div>
        <button className="cta_button">
          <Link to="/signup">Buy Now</Link>
        </button>
      </div>
    );
  }
}
