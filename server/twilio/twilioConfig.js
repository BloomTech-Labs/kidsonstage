var dotenv = require('dotenv');
var cfg = {};

cfg.accountSid = process.env.TWILIO_ACCOUNT_SID;
cfg.authToken = process.env.TWILIO_AUTH_TOKEN;
//use this line for live
//cfg.sendingNumber = process.env.TWILIO_NUMBER;

//use these lines for testing
cfg.sendingNumber = require('twilio')(cfg.accountsSid, cfg.authToken);

sendingNumber.incomingPhoneNumbers.create(
	{
		phoneNumber: '+15005550006'
	},
	function(err, number) {
		process.stdout.write(number.sid);
	}
);

var requiredConfig = [cfg.accountSid, cfg.authToken, cfg.sendingNumber];
var isConfigured = requiredConfig.every(function(configValue) {
	return configValue || false;
});

if (!isConfigured) {
	var errorMessage =
		'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_NUMBER must be set.';

	throw new Error(errorMessage);
}

module.exports = cfg;

// if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test') {
//   dotenv.config({path: '.env'});
// } else {
//   dotenv.config({path: './process.env', silent: true});
// }
