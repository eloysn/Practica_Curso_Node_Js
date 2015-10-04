"use strict";
var crypto = require('crypto');

//funcion para encriptar el password del usuario
 function encriptar (user , pass ) {

    var cyt = crypto.createHmac('sha1', user).update(pass).digest('hex');

         return cyt;
};

module.exports = encriptar;