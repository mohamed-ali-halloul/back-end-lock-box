const express =require('express');
const app =express();
const cors =require('cors');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDocs= require('./docs/index');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
require('./app/middlewares/authJwt');
app.use(morgan("dev"));
app.use (express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerJsDocs));
const db =require("./app/models");
require("./app/routes/tarifs_routes")(app);
require("./app/routes/users_routes")(app);
require("./app/routes/boxes_routes")(app);
require("./app/routes/cabines_routes")(app);
app.listen(3001,()=>{
    console.log("server is running on port 3001");
})