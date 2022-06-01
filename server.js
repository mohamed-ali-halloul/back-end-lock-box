const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDocs = require("./docs/index");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mqtt = require("mqtt");
const fs = require('fs')
const path = require('path')
const KEY = fs.readFileSync(path.join(__dirname, './client.key'))
const CERT = fs.readFileSync(path.join(__dirname, './client.crt'))
const TRUSTED_CA_LIST = fs.readFileSync(path.join(__dirname, './ca.crt'))
require("./app/middlewares/authJwt");
const PORT=30000
const HOST= 'mosquitto.dev.locbox.l-wa.com'

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
global.clientMqtt=client
clientMqtt.on("connect",  () => {
  console.log("mqtt connected");
});
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));
const db = require("./app/models");
require("./app/routes/tarifs_routes")(app);
require("./app/routes/users_routes")(app);
require("./app/routes/boxes_routes")(app);
require("./app/routes/cabines_routes")(app);
require("./app/routes/sizes_routes")(app);
require("./app/routes/door_routes")(app);
require("./app/routes/mobiles_services_routes")(app);
require("./app/routes/dashboard_routes")(app);
const User = db.User;
const Box = db.box;

client.on("connect", function () {
    console.log('server connected to Mqtt broker');

  client.subscribe("#", function () {});
  client.on("message", async function (topic, message) {
      if(topic.includes("/OpenDoorRequect") ){
    console.log(`Message incoming topic:`, topic);
    console.log(message.toString());

    let x = JSON.parse(message);
    console.log(x);
    const Code = x.Code;
    const number = x.BoxNumber;
    const UserCode = await User.findByPk(1);
    const refcabine = topic.split("/")[0];
    const topicreply = `${refcabine}/OpenDoorRequest/Reply`;
    const topiccc = `${refcabine}/OpenDoor`;
    const box = await Box.findOne({ where: { name: number } });
if(box){


    const getData = () => ({
      DoorNumber: box.doorNumber,
      BoardID: box.boardID,
    });

    if (Code === UserCode.code || Code === box.code) {
      const message = {
        ack: 1,

        msg: "requete acceptee",
      };
      client.publish(topicreply, JSON.stringify(message));
      client.publish(topiccc, JSON.stringify(getData()));
    } else {
      const message = {
        ack: -1,

        msg: "code incorrect",
      };
      client.publish(topicreply, JSON.stringify(message));
    }
}
else{
    const message = {
        ack: -1,

        msg: "box invalid",
      };
    client.publish(topicreply, JSON.stringify(message)); 
}

   } });
});

app.listen(3002, () => {
  console.log("server is running on port 3002");
  console.log(process.env.API_URL);
});
