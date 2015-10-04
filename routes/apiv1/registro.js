"use strict";


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Usuario = mongoose.model('Usuario');
var TokenPush = mongoose.model('PushToken')
var encriptar = require('../.././lib/encriptarpassword.js');
var MobileDetect = require('mobile-detect');


router.post('/',function(req, res, next){


    var username = req.body.name;
    var email    = req.body.mail;
    var password = req.body.pass;

    //Comprobamos si el usuario se ha registrado correctamente.
    if(username  === undefined || password === undefined || username  === '' || password === '' ){

        res.json({menssage:req.__("USER_AND_PASSWORD_INVALID")});

    }else
    {

    //Encriptamos el password y comprobamos si el uuario esta ya registrado.
    var passEncriptada = encriptar(username, password);





        var usuarionuevo = new Usuario({nombre: username, email: email, clave: passEncriptada});
        var md = new MobileDetect(req.headers['user-agent']);
        var platform; 
        var token;

        //COMPROBAMOS DESDE NOS HACEN LA LLAMADA
        if (md.os() === 'iOS') {
                 platform = 'ios';
                token = 'APNS';
         } else if (md.os() === 'AndroidOS') { 
                platform = 'android';
                token = 'GCM';
         } else { 
            platform = 'ios';
            token = 'APNS';
                             }

           var pushtoken = new TokenPush({usuario: username, token: token, plataforma: platform});


        //LO BUSCAMOS EN LA DB
        Usuario.findOne({nombre: username}, function (err, user) {


            if (!user) {
                usuarionuevo.save(function (err, nuevo) {
                    if (err) {
                        console.log(err);
                        return res.json({ok: false, error: {code:401,message: req.__('ERROR_AUTHENTICATION_FAILED_USER_NOT_FOUND') } });
                    }

                    // devolver una confirmación
                    res.json({ok: true, usuario: nuevo});

                });
                pushtoken.save(function (err, nuevo) {
                    if (err) {
                        console.log(err);


                    }


                });

            } else {

                 res.json({ok: false, error: {code:401,message:req.__('THIS USER IS REGISTRED') } });

            }


        });

    }
});








module.exports = router;