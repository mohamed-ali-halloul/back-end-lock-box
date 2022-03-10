module.exports = app => {
const boxes = require("../controllers/boxes_controllers")
var router = require("express").Router();
router.post("/",boxes.create);
router.get("/",boxes.getAll);
router.get("/:id",boxes.getOne);
router.put("/:id",boxes.update);
router.delete("/:id",boxes.deleteOne);
router.delete("/",boxes.deleteAll);
app.use('/api/boxes',router);
}