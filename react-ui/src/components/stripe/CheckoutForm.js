import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import CardSection from './CardSection';
import { Container, Button, Form } from 'reactstrap';

import { ROOT_URL } from '../../actions/index';

const eventId = Number(sessionStorage.getItem('eventId'));

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    const email = this.state.email;
    const event = this.props.eventId;

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe
      .createToken({ name: 'Woody Carpenter' }) //User to purchase Event
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
        axios
          .post(`${ROOT_URL}/checkout/events/${event}`, {
            token: token.id,
            email
          })
          .then((res) => {
            console.log('Charge success: ', res.data);
            // ACTIVATE EVENT REQUEST
            axios
              .put(`${ROOT_URL}/events/${res.data.eventId}/activate`, {
                status: res.data.status,
              })
              .then((res2) => {
                console.log('Event activated!', res2.data);
                window.location = '/events/details';
              })
              .catch((err2) => {
                console.log('Could not activate event', err2);
              });

            // window.location = '/events/details';
          })
          .catch((err) => {
            console.log('Payment charge unsuccessful', err);
            // window.location = '/';
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
