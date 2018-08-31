'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfileSchema = Schema({
    IdProfile: String,
    Name: String,
    Descripcion: String,
    Status: Boolean
    
});

module.exports = mongoose.model('Profile', ProfileSchema);