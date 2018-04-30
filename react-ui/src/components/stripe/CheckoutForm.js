import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import { Container, Button, Form } from 'reactstrap';
import PropTypes from 'prop-types';
import CardSection from './CardSection';
import AxiosPromise from '.././axiosPromise';

// const eventId = Number(sessionStorage.getItem('eventId'));
/* eslint-disable no-console, react/forbid-prop-types */

class CheckoutForm extends React.Component {
  static propTypes = {
    eventId: PropTypes.number.isRequired,
    stripe: PropTypes.object.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    const { email } = this.state;
    const event = this.props.eventId;

    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe
      .createToken({ name: 'Woody Carpenter' }) // User to purchase Event
      .then(({ token }) => {
        console.log('Received Stripe token:', token);
        AxiosPromise({
          verb: 'post',
          url: `/checkout/events/${event}`,
          body: {
            token: token.id,
            email,
          },
        }, (err, res) => {
          if (res) {
            console.log('Charge success: ', res.data);
            // ACTIVATE EVENT REQUEST
            const { eventId } = res.data;
            AxiosPromise({
              verb: 'put',
              url: `/events/${eventId}/activate`,
              body: {
                status: res.data.status,
              },
            }, (err2, res2) => {
              if (res2) {
                console.log('Event activated!', res2.data);
                window.location = `/events/details?eventId=${eventId}&admin=${1}`;
              } else {
                console.log('Could not activate event', err2);
              }

            // window.location = '/events/details';
            });
          } else {
            console.log('Payment charge unsuccessful', err);
            // window.location = '/';
          }
        });
      });
  }
  // However, this line of code will do the same thing:
  // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

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
