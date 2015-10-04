"use strict";


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Anuncio = mongoose.model('Anuncio');

var jwtAuth = require('../../lib/jwtVerificar');



//pasamos primero siempre por esta peticion sea la que sea para recoger el token
router.use(jwtAuth());

//una vez tenemos el token podemos consultar la lista de anuncios
router.get('/', function(req, res, next) {



//filtramos la peticion de la query
    var filtros = {};

    if (typeof req.query.nombre !== 'undefined') {
        filtros.nombre = new RegExp('^' + req.query.nombre, "i");

    }

    if (typeof req.query.tags !== 'undefined') {
        filtros.tags = req.query.tags;
    }

    if (typeof req.query.venta !== 'undefined') {
        filtros.venta = req.query.venta;
    }

    if (typeof req.query.precio !== 'undefined') {

        if (req.query.precio === '10-50' ){
            filtros.precio = {'$gte': '10', '$lte': '50' };
        }else if(req.query.precio === '10' ){
            filtros.precio = {'$gte':'10'};
        }else if(req.query.precio === '-50' ){
            filtros.precio = {'$lte':'50'};
        }else if(req.query.precio === '50' ){
            filtros.precio = '50';
        }else{
            filtros.precio = req.query.precio;
        }


    }


//llamamos a un metodo del modelo para que comienze la busqueda
    Anuncio.lista(filtros,function(err, lista){
        if (err) {
            console.log(err);
            return res.json({ok:false, menssage:req.__("ITEM_NOT_FOUND")});
        }

        res.json({ok:true, data: lista, menssage:req.__("ITEM_FOUND")});

    });


});





module.exports = router;