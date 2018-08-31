'use strict'

var express = require('express');
var UserController = require('../Controllers/user_Controller');
var Md_Auth = require('../middlewares/Auth');
var multipart = require('connect-multiparty');
var md_Upload = multipart({uploadDir : './Uploads/users'});


var api = express.Router();


api.get('/home', UserController.home);
api.get('/prueba',Md_Auth.ensureAuth, UserController.Prueba);
api.post('/RegistrerUser', UserController.SaveUser);
api.post('/LoginUser', UserController.LoginUser);
api.post('/GetUser/:IdUsuario',Md_Auth.ensureAuth, UserController.GetUser);
api.post('/ListarUser/:Page',Md_Auth.ensureAuth, UserController.LisUser);
api.put('/UserUpdate/:IdUsuario',Md_Auth.ensureAuth, UserController.UpdateUser);
api.post('/Uploade/:IdUsuario',[Md_Auth.ensureAuth, md_Upload], UserController.uploadimagen);
api.post('/GetAvatarFile/:Avatar',Md_Auth.ensureAuth, UserController.getImagenFile);


module.exports = api;