'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var Secret = 'Clave_Secreta_APP_School';


exports.ensureAuth = function(req ,res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message : 'No Se puede Acceder App Token no Valido'});

    }
    var Token = req.headers.authorization.replace(/['"]+/g, '');
    try {
        var payload = jwt.decode(Token, Secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message : 'El Token ha Expirado'
            });
        }       
    } catch (error) {
        return res.status(404).send({
            message : 'El Token no es Valido'
        });
    }

    req.user = payload;
    next();
}