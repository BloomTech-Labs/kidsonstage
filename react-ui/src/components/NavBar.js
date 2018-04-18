import React, { Component } from 'react';
import { LinkContainer } from 'react-router-bootstrap';

import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  Button,
  NavItem,
  NavLink
} from 'mdbreact';

import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './css/navBar.css';

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
      <Navbar
        className="navbar-navbar"
        color="blue-grey darken-2"
        dark
        expand="md"
        scrolling
      >
        <NavbarBrand href="/">
          <strong>K</strong>
        </NavbarBrand>
        {!this.state.isWideEnough && <NavbarToggler onClick={this.onClick} />}
        <Collapse isOpen={this.state.collapse} navbar>
          <NavbarNav left className="nav">
            <NavItem>
              <NavLink
                exact
                className="nav-link"
                to="/"
                activeClassName="success-color"
              >
                Home
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
                className="nav-link"
                to="/settings"
                activeClassName="success-color"
              >
                Settings
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link"
                to="/events"
                activeClassName="success-color"
              >
                Events
              </NavLink>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem>
              <NavLink
                className="nav-link"
                to="/signin"
                activeClassName="success-color"
              >
                Sign In
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className="nav-link"
                to="/signup"
                activeClassName="success-color"
              >
                Sign Up
              </NavLink>
            </NavItem>
          </NavbarNav>
        </Collapse>
      </Navbar>
    );
  }
}
