const db = require("../models");
const Box = db.box;
const Op = db.Sequelize.Op;
const mqtt = require('mqtt');
const fs = require('fs')
const path = require('path')
const KEY = fs.readFileSync(path.join(__dirname, '../../client.key'))
const CERT = fs.readFileSync(path.join(__dirname, '../../client.crt'))
const TRUSTED_CA_LIST = fs.readFileSync(path.join(__dirname, '../../ca.crt'))

const PORT=30000
const HOST= 'mosquitto.dev.locbox.l-wa.com'


var request = require("request-promise");

exports.displayallboxesbyidcabine = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(id);
  Box.findAll(
    { where: { idcabine: id } },
    { attributes: { exclude: ["createdAt", "updatedAt"] } }
  )
    .then((boxes) => {
      res.status(200).json(boxes);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
exports.reservebox = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Box.findByPk(id)
    .then((box) => {
      if (!box) return res.status(404).json({ msg: "not found" });
      if (box.code === body.code) {
        box.availibility = 1;
        box
          .save()
          .then(() => res.status(201).json({ msg: "box is reserved" }))
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(404).json({ msg: "code is wrong" });
      }
    })

    .catch((error) => res.status(500).json(error));
};
exports.verifboxid = (req, res) => {
  const { id } = req.params;
  console.log("id", id);
  const { body } = req;
  Box.findByPk(id).then((box) => {
    if (!box) return res.status(404).json({ msg: "not found" });
    if (box.availibility === 0) {
      res.status(201).json({ box: box.ref, msg: "True , box is available" });
    } else {
      res.status(404).json({ box: box.ref, msg: "box is not available" });
    }
  });
};
exports.renderbox = (req, res) => {
  const { id } = req.params;
  const { body } = req;
  Box.findByPk(id)
    .then((box) => {
      if (!box) return res.status(404).json({ msg: "not found" });
      if (box.code === body.code) {
        box.availibility = 0;
        box
          .save()
          .then(() => res.status(201).json({ msg: "box is rendered" }))
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(404).json({ msg: "code is wrong" });
      }
    })

    .catch((error) => res.status(500).json(error));
};
exports.shortlink = (req, res) => {
  const { id } = req.params;

  const link = {
    dynamicLinkInfo: {
      domainUriPrefix: "https://locbox1.page.link",
      link: "https://diginov.tech/",
      androidInfo: {
        androidPackageName: "com.diginov.loc_box",
      },
      iosInfo: {
        iosBundleId: "com.diginov.locBox",
      },
    },
  };
  console.log(link);
  const options = {
    method: "POST",
    uri: " https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyAkAxD4Cjgm33EW_vnCrI-NcwSJEoMW548",
    body: link,
    json: true,
    headers: {
      "Content-Type": "application/json",
    },
  };

  request(options)
    .then(async (response) => {
      console.log("resp: ", response);
      return res.status(200).send({
        response,
        status: "success",
      });
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};
 exports.openDoor=(req,res)=>{
   const {id}= req.params;
   const { body } = req;
   Box.findByPk(id, ({include: ['cabines']})).then((box)=>{
    if (!box) return res.status(404).json({ msg: "not found" });
    const options = {
      username: 'locbox_dev',
      password:'laintAyak9Wrykrv%ov5',
      port: PORT,
      host: HOST,
      key: KEY,
      cert: CERT,
      rejectUnauthorized: true,
      // The CA list will be used to determine if server is authorized
      ca: TRUSTED_CA_LIST,
      protocol: 'mqtts'
    }
    var client = mqtt.connect(options);
  const getData = () => ({
     
          DoorNumber: box.doorNumber,
          BoardID: box.boardId,
          
      
  })
  const  refcabine=  box.cabines.ref;

  const topic = `${refcabine}/OpenDoor`;
  const topicreply =`${refcabine}/OpenDoor/Reply`;
  if (box.code === body.code){

  
      console.log('server connected to Mqtt broker');
      client.subscribe("#" , function(err){
          if(!err){
          client.publish(topic, JSON.stringify(getData()))
              return true
          }
          console.log(err);
      });
 
  client.on('message',function(topic,message){
      console.log(`Message incoming topic:`, topic)
      console.log(message.toString());
  });
  client
      .on('error', function (topic, payload) {
          console.log('Error:', topic, payload.toString());
      });
      res.status(200).json({msg:"code is correct and the door is opening"})
      
    }else {
      res.status(404).json({ msg: "code is wrong" });
    }
    
   })
  
 }
 exports.payment=async (req,res)=>{
   const stripe = require('stripe')('sk_test_51KtTVSGvZTEcLVjJpS8xOIqRsZNnwYYWQa1iDghKDURJtD9OMsxEGxWJgWfh45B5z2tSoePXLjmW8QHLAn4El02C003mtayPRH');

const paymentIntent = await stripe.paymentIntents.create({
  amount: 2000,
  currency: 'eur',
  payment_method_types: ['card'],
});
res.status(200).send({msg:"payment enregistré avec succes"});
 }
