'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'Clave_Secreta_APP_School';

exports.CreateToken = function(user){
    var payLoad = {
        sub : user.IdUsuario,
        name : user.name,
        Apellido : user.Apellido,
        Username : user.Username,
        Password : user.Password,
        Email : user.Email,
        Direccion : user.Direccion,
        Telefono : user.Telefono,
        Cod_Acompañante : user.Cod_Acompañante,
        idProfile : user.idProfile,
        Avatar : user.Avatar,
        Status : user.Status,
        iat : moment().unix(),
        exp : moment().add(1,'days').unix()
    };

    return jwt.encode(payLoad, secret);
};