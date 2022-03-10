const getUsers = require("./users/get-users");
const getUser = require("./users/get-user");
const createUser = require("./users/create-user");
const deleteUser = require("./users/delete-user");
const updateUser = require("./users/update-user");
const getBoxes = require("./boxes/get-boxes");
const getBox =require("./boxes/get-box");
const createBox = require("./boxes/create-box");
const deleteBox = require("./boxes/delete-box");
const updateBox = require("./boxes/update-box");
const getCabines = require("./cabines/get-cabines");
const getCabine = require("./cabines/get-cabine");
const createCabine =require("./cabines/create-cabine");
const deleteCabine = require("./cabines/delete-cabine");
const updateCabine =require("./cabines/update-cabine");
const inscriptionUser = require("./users/inscription-user");
const connexionUser = require("./users/connexion-user");

module.exports ={
paths : {
'/users': {
   
    ...getUsers,
    ...createUser,
    ...inscriptionUser
 
},
'/users/{id}':{
    ...getUser,
    ...updateUser,
    ...deleteUser,
    ...connexionUser
},
'/boxes': {
    ...getBoxes,
    ...createBox
},
'/boxes/{id}': {
    ...getBox,
    ...updateBox,
    ...deleteBox
},
'/cabines':{
    ...getCabines,
    ...createCabine
},
'/cabines/{id}':{
    ...getCabine,
    ...updateCabine,
    ...deleteCabine
}

}}