'use strict';


var jwt = require('jsonwebtoken');
var configJWT = require('.././config_app').jwt;






module.exports = function() {

    return function(req, res, next) {


        var token = req.body.token || req.query.token || req.headers['x-access-token'];

        // verificamos el token
        if (token) {


            jwt.verify(token, configJWT.secret, function(err, decoded) {
                if (err) {
                    return res.json({ ok: false, error: {code: 401, message:req.__('THE_TOKEN_IS_NOT_AUTHENTICATED')}});
                } else {


                    req.token = token;
                    req.decoded = decoded;

                    next();
                }
            });

        } else {

            // si el token no es valido devolvemos un error
            return res.status(403).json({
                ok: false,
                error: { code: 403, message: req.__('THERE_IS_NOT_TOKEN')}
            });

        }
    };
};
