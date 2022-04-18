module.exports= app =>{
    const mobile =require("../controllers/mobile_service_controllers")
    var router = require("express").Router();
    router.get("/:id",mobile.displayallboxesbyidcabine);
    router.get("/verif/:id",mobile.verifboxid);
    router.post("/reserve/:id",mobile.reservebox);
    router.post("/render/:id",mobile.renderbox);
    router.post("/shortlink",mobile.shortlink);
    router.post("/opendoor/:id",mobile.openDoor);
    app.use('/api/mobile',router);

}