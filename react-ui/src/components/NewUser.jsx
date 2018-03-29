import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import '../index.css';

/* eslint-disable no-console, react/prop-types */

function hash(s) {
  return s;
}
export default class NewUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      phone: 0,
      password: '',
      useTexts: false,
      useEmails: false,

    };
  }

  render() {
    return (
      <form
        onSubmit={() => {
                    // e.preventDefault();
                    this.props.register({
                        username: this.state.username,
                        email: this.state.email,
                        phone: this.state.phone, // number
                        passwordHash: hash(this.state.password),
                        useTexts: this.state.useTexts, // bool
                        useEmails: this.state.useEmails, // bool
                    });
                    this.setState({
                        username: '',
                        email: '',
                        phone: 0,
                        password: '',
                        useTexts: false,
                        useEmails: false,
                    }, () => console.log('after setState'));
                    // this.props.history.push('/');
                 // }).catch((err) => { console.log(`error: ${err}`); });
              }
            }
      >
        <div className="flex-center-div">
          <p className="new-user-label">Username</p>
          <input
            onChange={username => this.setState({ username })}
            className="new-user-inputText"
            label="username"
            type="text"
            size="30"
            id="new-user-username"
          />
        </div>
        <div className="flex-center-div">
          <p className="new-user-label">Email</p>
          <input
            onChange={email => this.setState({ email })}
            className="new-user-inputText"
            label="email"
            type="text"
            size="30"
            id="new-user-email"
          />
        </div>
        <div className="flex-center-div">
          <p className="new-user-label">Phone</p>
          <input
            onChange={phone => this.setState({ phone })}
            className="new-user-inputText"
            label="phone"
            type="text"
            size="30"
            id="new-user-phone"
          />
        </div>
        <div className="flex-center-div">
          <p className="new-user-label">Password</p>
          <input
            onChange={password => this.setState({ password })}
            className="new-user-inputText"
            label="password"
            type="password"
            size="16"
            id="new-user-password"
          />
        </div>
        <div className="flex-center-div" id="new-user-checkboxes">
          <div id="new-user-texts">
            <input
              type="checkbox"
              onClick={() => this.setState({
                  useTexts: !this.state.useTexts,
              })}
            />
            <p>Texts?</p>
          </div>
          <div id="new-user-emails">
            <input
              type="checkbox"
              onClick={() => this.setState({
                  useEmails: !this.state.useEmails,
              })}
            />
            <p>Email?</p>
          </div>
        </div>
        <div className="flex-center-div">
          <button className="new-user-submit" type="submit">Save</button>
        </div>
      </form >
    );
  }
}
NewUser.propTypes = {
  register: PropTypes.func.isRequired,
};

// NewUser.defaultProps = {
//   register: (o) => { console.log(`${Object.keys(o.username)} ${Object.keys(o.email)}
//  ${typeof o.passwordHash} ${o.useEmails} ${o.useTexts}`); },
// };

// export default withRouter(NewUser);
