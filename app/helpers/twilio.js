require('dotenv').config();
const accoundSid = process.env.TWILIO_ACCOUNT_SID;
const AuthToken= process.env.TWILIO_AUTH_TOKEN;

const sendSms= (message)=>{
    console.log("message",message);
    console.log( "number",process.env.TWILIO_PHONE_NUMBER);
    const client = require('twilio')(accoundSid,AuthToken);
    client.messages
    .create({
        body : message,
        from : process.env.TWILIO_PHONE_NUMBER,
        to : "+216 95 759 342"
    })
    .then(message=> console.log(message.sid));
}
module.exports= sendSms;