'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AsignaturaSchema = Schema({
    IdAsignatura: String,
    Name: String,
    IdCurso : {type: Schema.ObjectId, ref:'Curso'}
});

module.exports = mongoose.model('Asignatura', AsignaturaSchema);