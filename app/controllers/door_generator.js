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
  Box.findByPk(id).then((box) => {
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
          BoardID: box.boardId,
          
      
  })
  const topic = 'M_01/OpenDoor';
  client.on('connect',function(){
    console.log('server connected to Mqtt broker');
    client.subscribe("#" , function(err){
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
      text: "Hello world?", // plain text body
      html: box.code, // html body
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
    res.status(200).json({ code: box.code, msg: "email has been send and the door is opening" });
    
  });
  
};
