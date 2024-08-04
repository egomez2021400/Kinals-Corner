'use strict'

const express = require('express');
const app = express();
const {connection} = require("./src/database/connection");
require('dotenv').config;
const port = process.env.PORT;
const cors = require("cors");

const routesForum = require('./src/routes/forum.routes');
const routesHelpSocial = require('./src/routes/helpSocial.routes')
const routesUser = require('./src/routes/user.routes')
const routesTeacher = require('./src/routes/teacher.routes')
const { userDefault } = require('./src/controller/user.controller');
connection();
userDefault()

app.use(express.urlencoded({extended: false}));

app.use(express.json());
app.use(cors());

app.use('/api', routesForum);
app.use('/api', routesHelpSocial);
app.use('/api', routesUser);
app.use('/api', routesTeacher);


app.listen(port, ()=> {
    console.log(`Servidor corriendo en el puerto ${port}`);
})