const db = require("../models");
const Cabine = db.cabine;
const Box = db.box;
const cabineValidation = require("../validators/cabine_validation");
var request = require("request-promise");
const mqtt = require("mqtt");

exports.create = async (req, res) => {
  const { body } = req;
  const { error } = cabineValidation(body);
  if (error) return res.status(401).json(error.details[0].message);

  const cabine = Cabine.build({ ...body });
  // .then(()=>{
  //     res.status(201).json({msg:"creation du box"})
  // })
  // .catch(error =>{
  //     res.status(500).json(error)
  // });
  await cabine.save();
  const link = {
    dynamicLinkInfo: {
      domainUriPrefix: "https://locbox1.page.link",
      link: `https://diginov.tech/?cabineId=${cabine.id}`,
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
      cabine.shortLink = response.shortLink;
      await cabine.save();
      return res.status(200).send({
        status: "success",
        cabine: cabine,
      });
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};
exports.getAll = (req, res) => {
  Cabine.findAll({ attributes: { exclude: ["createdAt", "updatedAt"] } })
    .then((cabines) => {
      res.status(200).json(cabines);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
};
exports.getOne = (req, res) => {
  const { id } = req.params;
  Cabine.findByPk(id, { include: ["boxes"] }).then((cabine) => {
    if (!cabine) return res.status(404).json({ msg: "not found" });
    res.status(200).json(cabine);
  });
};
exports.deleteOne = (req, res) => {
  const { id } = req.params;
  Cabine.destroy({ where: { id: id } })
    .then((ressource) => {
      if (ressource === 0) return res.status(404).json({ msg: "not found" });
      res.status(200).json({ msg: "Deleted " });
    })
    .catch((error) => res.status(500).json(error));
};

exports.deleteAll = (req, res) => {
  Cabine.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums}Cabines were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Cabines.",
      });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;

  const { body } = req;
  Cabine.findByPk(id)
    .then((cabine) => {
      if (!cabine) return res.status(404).json({ msg: "not found" });
      cabine.name = body.name;
      cabine.id = body.id;
      cabine.ref = body.ref;
      cabine.network_type = body.network_type;
      cabine.mode = body.mode;
      cabine.shortLink = body.shortLink;
      cabine
        .save()
        .then(() => res.status(201).json({ msg: "updated ressource" }))
        .catch((error) => res.status(500).json(error));
    })
    .catch((error) => res.status(500).json(error));
};
exports.openAllAvailableBoxes = function (req, res, next) {
  try {
  //   var clientMqtt = mqtt.connect({
  //     host: '51.91.182.130',
  //     port:1883,
  //     username:"halloul",
  //    password:"654321"
  // });
  // console.log("------------",clientMqtt.connected)
    Cabine.findByPk(req.params.cabineId).then((cabine) => {
      const TOPICmAIN = `${cabine.ref}/#`;
      Box.findAll({
        where: { availibility: "0", idcabine: req.params.cabineId },
      })
        .then(async (resultat) => {
          console.log("resultat", resultat);
          resultat.forEach((element) => {
            console.log(element.id);
            console.log("qqqqq",clientMqtt.connected);
          
              clientMqtt.subscribe([TOPICmAIN], () => {
                console.log(`Subscribe to topic '${TOPICmAIN}'`);
              });
              const openbox = {
                BoardID: parseInt(element.boardID),
                DoorNumber: parseInt(element.doorNumber),
              };
              console.log("boardid", openbox.BoardID);
              console.log("doornumber", openbox.DoorNumber);
              const s = JSON.stringify(openbox);
              clientMqtt.publish(
                `${cabine.ref}/OpenDoor`,
                s,
                { qos: 0, retain: false },
                (error) => {
                  if (error) {
                    console.error(error);
                  }
                }
              );
            
          });
          clientMqtt.on("message", (topic, payload) => {
            console.log(
              "Received Message:",
              topic,
              "---->",
              JSON.parse(payload.toString())
            );
            if (JSON.parse(payload.toString()).OpenDoorReply === "1") {
              clientMqtt.unsubscribe([TOPICmAIN], "", () => {
                console.log(`Unsubscribe to topic '${TOPICmAIN}'`);
              });
              clientMqtt.end(true);
              return res.status(200).send({
                status: "success",
                message: "box opened.",
              });
            }
            if (JSON.parse(payload.toString()).OpenDoorReply === "-1") {
              clientMqtt.unsubscribe([TOPICmAIN], "", () => {
                console.log(`Unsubscribe to topic '${TOPICmAIN}'`);
              });
              clientMqtt.end(true);
              return res.status(500).send({
                status: "error",
                message: "mqtt Serveur crashed.",
              });
            }
            setTimeout(() => {
              if (
                JSON.parse(payload.toString()).OpenDoorReply !== "-1" &&
                JSON.parse(payload.toString()).OpenDoorReply !== "1"
              ) {
                if (clientMqtt.connected) {
                  console.log("hereeeeee");
                  clientMqtt.unsubscribe([TOPICmAIN], "", () => {
                    console.log(`Unsubscribe to topic '${TOPICmAIN}'`);
                  });
                  clientMqtt.end(true);
                  return res.status(501).send({
                    status: "error",
                    message: "server crashed.",
                  });
                }
              } else {
                clientMqtt.unsubscribe([TOPICmAIN], "", () => {
                  console.log(`Unsubscribe to topic '${TOPICmAIN}'`);
                });
                clientMqtt.end(true);
                return res.status(501).send({
                  status: "error",
                  message: "server crashed.",
                });
              }
            }, 3000);
          });
        })
        .catch((err) => {
          res.send({
            status: "error",
            message: "Error setting price  with id=",
            err,
          });
        });
    }).catch((err)=>{
      res.send({
        status:"error",
        message:"error cabine",
        err
      })
    });
console.log( clientMqtt);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: "error",
      message: "Something went wrong",
    });
  }
};
