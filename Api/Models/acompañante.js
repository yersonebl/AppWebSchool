'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AcompSchema = Schema({
    Cod_Acompañante: {type: Schema.ObjectId, ref:'User'},
    Name: String,
    Apellido: String,
    Email: String,
    Direccion: String,
    Telefono: Number,
       
});

module.exports = mongoose.model('Acompañante', AcompSchema);