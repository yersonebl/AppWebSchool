'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursoSchema = Schema({
    Id_Curso: String,
    Name: String,
    IdUsuario: {type: Schema.ObjectId, ref:'User'},
    IdDocente : {type: Schema.ObjectId, ref:'Docente'},
    Limit_cupo: String,
});

module.exports = mongoose.model('Curso', CursoSchema);