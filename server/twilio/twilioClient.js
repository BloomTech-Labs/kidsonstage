require('dotenv').config({path: '../../.env'});

export function sendSms(to, message) {
  // Twilio Credentials
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_TOKEN;
  const sendingNumber = process.env.TWILIO_NUMBER;
  // Require the twilio module and create a REST client
  const client = require('twilio')(accountSid, authToken);

  client.messages
    .create({
      to: to,
      from: sendingNumber,
      body: message
    })
    .then(function(data) {
      console.log('Administrator notified');
    }).catch(function(err) {
      console.error('Could not notify administrator');
      console.error(err);
    });
}



