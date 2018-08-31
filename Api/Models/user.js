'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    IdUsuario: String,
    Name: String,
    Apellido: String,
    Username: String,
    Password: String,
    Status: Boolean,
    Email: String,
    Direccion: String,
    Telefono: String,
    Avatar: String,
    Cod_Acompañante: String,
    IdProfile : String
    //{type: Schema.ObjectId, ref:'Profile'}
});

module.exports = mongoose.model('User', UserSchema);