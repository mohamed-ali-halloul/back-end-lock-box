module.exports= app =>{
    const door =require("../controllers/door_generator")
    var router = require("express").Router();
    router.post("/:id",door.send);
    app.use('/api/door',router);

}