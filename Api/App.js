'use strict'

var express = require('express');
var bodyParser = require('body-parser');


var  app = express();

// cargar Rutas 
var user_routes = require('./routes/user_routes');


// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



// vors


// rutas
app.use('/api', user_routes);

//Exportar 

module.exports = app;