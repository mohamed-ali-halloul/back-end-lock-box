const express = require("express");
const app = express();
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDocs = require("./docs/index");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const mqtt = require("mqtt");

require("./app/middlewares/authJwt");
var client = mqtt.connect({
    host: '51.91.182.130',
    port:1883,
    username:"halloul",
password:"654321"
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
app.listen(3001, () => {
  console.log("server is running on port 3001");
});
