"use strict";

require('./../lib/dbMongo');
require('./../models/modelAnuncios');
require('./../models/modelUsuarios');

var fs = require('fs');
var path = require('path');
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');
var Usuario = mongoose.model('Usuario');

//Eliminamos anuncion de la DB

Anuncio.remove({},function(err){

    if (err){
        console.log('Error al borrar los anuncios',err);

    } else{
        console.log('Anuncios borrados');

        return cargaDB();
    }
});
// cargamos unos anuncios de prueba
function cargaDB(){



    fs.readFile(path.join(__dirname,'.././anuncios.json'),'utf8', function(err ,dat) {



        if (err){

            console.log('error leyendo el fichero Json', err);
            return;

        }
            try{
                var load = JSON.parse(dat);

            }
        catch(err){

            console.log('error parseando los datos desde el Json',err);
        }


        load.anuncios.forEach(function(item){
            var anuncio = new Anuncio(item);


            anuncio.save(function(err, user){
                if (err) {
                    console.log('No se ha podido cargar el anuncio');
                } else {
                    console.log('anuncio', user);
                }
            });

        });





    });


}






