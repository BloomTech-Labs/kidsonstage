import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import centerPng from '../graphics/landing-center-graphic.png';
import '../index.css';


export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // text: props.text,
    };
  }

  render() {
    return (
      <div>
        <section className="landing-button-container">
          <button className="landing-button" id="landing-signUp">sign up</button><button className="landing-button" id="landing-signIn">sign in</button>
        </section>
        <img src={centerPng} id="landing-centerPng" alt="Center" />
        <section className="landing-text-container">
          <p>Welcome to Kids On Stage The Place to Come to Tell Friends About Your Kids on Stage</p>
        </section>
        <div id="testj" >
          <button id="landing-buynow-box">
          {/*   <Link href="/event-list">Buy Now</Link> */}
           <p>Buy Now</p>
          </button>
        </div>
      </div>
    );
  }
}
// Landing.propTypes = {
//   signUp: PropTypes.func.isRequired,
//   signIn: PropTypes.func.isRequired,
//   // addUser: PropTypes.func.isRequired,
// };
