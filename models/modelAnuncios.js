"use strict";

var mongoose = require('mongoose');

// definimos esquema Anuncios


var anuncioSchema = mongoose.Schema({

    nombre: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]

});

 anuncioSchema.statics.lista = function( criterios, callback) {





    var query = Anuncio.find(criterios);

     query.skip(0);
     query.limit(50);

    query.exec( function(err, rows) {
        if (err) {
            return callback(err);
        }

        return callback(null, rows);

    });
};



// exportar

var Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;