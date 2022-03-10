module.exports = app => { 
const users = require ("../controllers/users_controllers.js")
const authJwt = require("../middlewares/authJwt");
var router = require("express").Router();

router.post("/inscription",users.inscription);
router.post("/connexion",users.connexion);
router.post("/",[authJwt.verifyToken],users.create);
router.get("/",[authJwt.verifyToken],users.getAll);
router.get("/:id",[authJwt.verifyToken],users.getOne);
router.put("/:id",[authJwt.verifyToken],users.update);
router.delete("/:id",[authJwt.verifyToken],users.deleteOne);

app.use('/api/users',router);
} 