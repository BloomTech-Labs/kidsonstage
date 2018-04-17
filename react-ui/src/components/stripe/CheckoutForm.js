import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import CardSection from './CardSection';
import { Container, Row, Button, Input, Form, Badge, Col } from 'reactstrap';

import { ROOT_URL, authError } from '../../actions/index';

class CheckoutForm extends React.Component {
  state = {
    email: '',
  };


  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    const email = this.state.email;

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe
      .createToken({ name: 'Woody Carpenter' }) //User to purchase paperStack
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
        axios
          .post(`${ROOT_URL}/checkout`, {
            token: token.id,
            email
          })
          .then((res) => {
            console.log('Charge success: ', res.data);
            window.location = '/events';
          })
          .catch((err) => {
            console.log('there was an error', err);
            window.location = '/';
          });
      })
      .catch((e) => {
        console.log('there was an error', e);
      });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <h1 align="center">
             PAY FOR EVENT
          </h1>
          <Container>
            <CardSection />
            {/* <AddressSection /> */}
            <Button color="success">Buy Now</Button>
          </Container>
        </Form>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
