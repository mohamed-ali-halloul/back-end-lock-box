require("dotenv").config();
const db = require("../models");
const Box = db.box;
const Op = db.Sequelize.Op;
const nodemailer = require("nodemailer");
const sendSms = require("../helpers/twilio");
const mqtt = require('mqtt');

exports.send = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Box.findByPk(id, { include:
    ['cabines']
      }).then((box) => {
    if (!box) return res.status(404).json({ msg: "not found" });

    box.code = body.code;

    box.save();
    var client = mqtt.connect({
      host: '51.91.182.130',
      port:1883,
      username:"halloul",
  password:"654321"
  });

  const getData = () => ({
     
          DoorNumber: box.doorNumber,
          BoardID: box.boardID,
      
  });
const  refcabine=  box.cabines.ref;

 
  console.log('refcabine:',refcabine);
  const topic = `${refcabine}/OpenDoor`;
  const topicreply =`${refcabine}/OpenDoor/Reply`;
  client.on('connect',function(){
    console.log('server connected to Mqtt broker');
    client.subscribe(topicreply, function(err){
        if(!err){
        client.publish(topic, JSON.stringify(getData()))
            return true
        }
        console.log(err);
    });
}); 
client.on('message',function(topic,message){
    console.log(`Message incoming topic:`, topic)
   
        console.log(message.toString());
  let x=JSON.parse(message);
    console.log("x",parseInt(x.OpenDoorReply) );
    const num = parseInt(x.OpenDoorReply);
    if(num===1){
      client.unsubscribe(topicreply);
      client.end();
       return res.status(200).send({msg:"success"})
    }
    else{ 
      client.unsubscribe(topicreply);
      client.end();
      return res.status(400).send({msg:"failed"}) }
});
client
    .on('error', function (topic, payload) {
        console.log('Error:', topic, payload.toString());
    });
   
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    let mailOptions = {
      from: '"LOCK BOX " <lockboxdigi@gmail.com>', // sender address
      to: "mimodali2000@gmail.com", // list of receivers
      subject: "CODE OF BOX ", // Subject line
      text: "Hello world", // plain text body
      html: `<div>
        <h1>Loc'Box</h1>
        <p>This is the code of the box</p>
        <strong><i>${box.code}</i></strong> </div>
        `,
      // html body
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      } else {
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
    });
    const Message= `welcome to lock box ! your code is ${box.code}`;
    sendSms(Message);
    // res.status(200).json({ code: box.code, msg: "email has been send and the door is opening" });
    
  });
  
};
