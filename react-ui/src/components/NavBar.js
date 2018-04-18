import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  Button,
} from 'mdbreact';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      isWideEnough: false
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  render() {
    return (
      <Navbar color="blue-grey darken-2" dark expand="md" scrolling>
        <NavbarBrand href="/">
          <strong>Kids on Stage!</strong>
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left className="nav">
            <LinkContainer
              exact
              to="/"
              className="nav-item"
              activeClassName="success-color"
            >
              <Button color="success-color-dark">Home</Button>
            </LinkContainer>
            <LinkContainer
              className="nav-item nav-link"
              to="/signin"
              activeClassName="success-color"
            >
              <Button color="success-color-dark">Sign In</Button>
            </LinkContainer>
            <LinkContainer
              exact
              to="/signup"
              className="nav-item"
              activeClassName="success-color"
            >
              <Button color="success-color-dark">Sign Up</Button>
            </LinkContainer>
            <LinkContainer
              className="nav-item nav-link"
              to="/settings"
              activeClassName="success-color"
            >
              <Button color="success-color-dark">Settings</Button>
            </LinkContainer>
            <LinkContainer
              className="nav-item nav-link"
              to="/events"
              activeClassName="success-color"
            >
              <Button color="success-color-dark">Events</Button>
            </LinkContainer>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}
