'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DocenteSchema = Schema({
    IdDocente: String,
    Name: String,
    Apellido: String,
    Email: String,
    Telefono: Number,   
    IdProfile : {type: Schema.ObjectId, ref:'Profile'},
    IdCurso : {type: Schema.ObjectId, ref:'Curso'}
});

module.exports = mongoose.model('Docente', DocenteSchema);