module.exports = app => {
    const cabines = require("../controllers/cabines_controllers")
    var router = require("express").Router();
    router.post("/",cabines.create);
    router.get("/",cabines.getAll);
    router.get("/:id",cabines.getOne);
    router.put("/:id",cabines.update);
    router.delete("/:id",cabines.deleteOne);
    router.delete("/",cabines.deleteAll);
    app.use('/api/cabines',router);
    }