import React, { Component } from 'react';
import { StripeProvider } from 'react-stripe-elements';
import Checkout from './Checkout';

class Billing extends Component {
  render() {
    return (
      <div>
        <StripeProvider apiKey="pk_test_aXBCDOHhiuIQVztrMnGgmMCW">
          <Checkout />
        </StripeProvider>
      </div>
    );
  }
}

export default Billing;
