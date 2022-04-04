require('dotenv').config();
const accoundSid = process.env.TWILIO_ACCOUNT_SID;
const AuthToken= process.env.TWILIO_AUTH_TOKEN;

const sendSms= (message)=>{
    const client = require('twilio')(accoundSid,AuthToken);
    client.messages
    .create({
        body : message,
        from : process.env.TWILIO_PHONE_NUMBER,
        to : +21652784584
    })
    .then(message=> console.log(message.sid));
}
module.exports= sendSms;