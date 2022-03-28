module.exports = app => {
    const tarifs = require("../controllers/tarifs_controllers")
    var router = require("express").Router();
    router.post("/",tarifs.create);
    router.get("/",tarifs.getAll);
    router.get("/:id",tarifs.getOne);
    router.put("/:id",tarifs.update);
    router.delete("/:id",tarifs.deleteOne);
    router.delete("/",tarifs.deleteAll);
    app.use('/api/tarifs',router);
    }