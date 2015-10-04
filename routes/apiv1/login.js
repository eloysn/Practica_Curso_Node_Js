'use strict';

/**
 * API /users resource.
 * @module routes/apiv1/users
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('Usuario');
var jwt = require('jsonwebtoken');
var config = require('../../config_app');
var encriptar = require('../.././lib/encriptarpassword.js');








router.post('/login', function(req, res,n) {

    console.log(req.body.name);


    var username = req.body.name;
    var password = req.body.pass;


    //buscamos al user en DB
    User.findOne({nombre: username}, function (err, user) {

        if (err) {
            //USUARIO NO ENCONTRADO
            return res.status(500).json({ok: false, error: {code: 500, message: req.__("ERROR_LOOKING_TO_YOU")}});
        }


        if (!user) {
            //AUTENTICACION FALLIDA
            return res.json({ok: false, error: {code: 401, message: req.__("AUTHENTICATION_FAILED_USER_NOT_FOUND")}});
        }
        else if (user) {

            var passEncriptada = encriptar(user.nombre, password);

            // COMPROBAMOS EL PASS
            if (user.clave != passEncriptada) {

                res.json({ok: false, error: {code: 401, message: req.__("AUTHENTICATION_FAILED_WRONG_PASSWORD")}});

            }

            else {

                var token = jwt.sign(user, config.jwt.secret, {
                    expiresInMinutes: config.jwt.expiresInMinutes
                });

                        //DEVOLVEMOS EL TOKEN
                        res.json({
                            ok: true,
                            message: req.__("TOKEN_SAVED"),
                            token: token
                        });
            }










        }





    });






});

module.exports = router;

