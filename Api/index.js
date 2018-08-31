'use strict'
var mongosse = require('mongoose');
var app = require('./App');
var port = 3800;
// conecion a la bd 
    mongosse.Promise = global.Promise;
    mongosse.connect('mongodb://localhost:27017/appbd', {useNewUrlParser: true})
                .then(() =>{
                    console.log('la Conexion a la bd es exitosa');
                    // crear server 
                    app.listen(port, ()=> {
                        console.log('Servidor Iniciado....');
                    });
                })
                .catch(err => console.log(err));


                