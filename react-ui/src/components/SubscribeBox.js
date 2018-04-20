import React, { Component } from 'react';

import { Navbar, NavbarBrand } from 'mdbreact';

import './css/subscriberBox.css';

export default class SubscriberBox extends Component {
  render() {
    return (
      <div className="subscriberBox--form_container">
      <Navbar className="subscriberBox--box_navbar" dark>
      <NavbarBrand tag="span">Subscribe to Event</NavbarBrand>
    </Navbar>

     <form>
      <input type="text" placeholder="Event Code" /><br />
      <button type="submit">Add Event</button>
      </form>
     
     </div>

    )
  }
}
