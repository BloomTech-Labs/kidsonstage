var dotenv = require('dotenv');
var cfg = {};

cfg.accountSid = env.TWILIO_ACCOUNT_SID;
cfg.authToken = env.TWILIO_AUTH_TOKEN;
//use this line for live
//cfg.sendingNumber = env.TWILIO_NUMBER;

//use these lines for testing
cfg.sendingNumber = require('twilio')(cfg.accountsSid, cfg.authToken);

sendingNumber.incomingPhoneNumbers.create(
	{
		phoneNumber: '+15005550006'
	},
	function(err, number) {
		stdout.write(number.sid);
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

// if (env.NODE_ENV !== 'production' && env.NODE_ENV !== 'test') {
//   dotenv.config({path: '.env'});
// } else {
//   dotenv.config({path: './env', silent: true});
// }
