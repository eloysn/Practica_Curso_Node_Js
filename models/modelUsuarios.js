"use strict";

var mongoose = require('mongoose');

// definimos esquema usuario

var usuarioSchema = mongoose.Schema({

    nombre: String,
    email: String,
    clave: String

});

usuarioSchema.index({nombre: 1 ,type: -1});



var Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;