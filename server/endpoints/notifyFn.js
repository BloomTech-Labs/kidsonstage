const sgMail = require('@sendgrid/mail');
const moment = require('moment');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export function notifyFunction(data) {
  for (let i = 0; i < data.length; i++) {
    const name = data[i].name;
    const currentTime = moment('12:30:00', "hh:mm:ss");
    const time = moment(data[i].time, "hh:mm:ss");
    const difference = moment.duration(time.diff(currentTime, 'minutes'));
    let emailArr = [];
   
    for (let j = 0; j < data[i].subscribers.length; j++) {
      if ('email' in data[i].subscribers[j]) emailArr.push(data[i].subscribers[j].email);
    }
    
    if (emailArr.length > 0) {
      const message = {
        to: emailArr,
        from: 'admin@kidsonstage.herokuapp.com',
        templateId: 'b3f63a64-a93a-4678-bfdc-4185f796989f',
        substitutions: {
          group: name,
          remaining: difference
        }
      };
      // sgMail.sendMultiple(message);
      // console.log(message);
    }
  }
}