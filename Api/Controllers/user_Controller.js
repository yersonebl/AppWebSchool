'use strict'
var bcrypt = require ('bcrypt-nodejs');
var User = require ('../Models/user');
var Profile = require('../Models/profile');
var jwt = require('../Services/jwt');
var mongoose_Pasgination = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');


function home(req, res){
    res.status(200).send({
        message: 'Accion de prueba en el server '
    });

}

function Prueba(req, res){
    res.status(200).send({
        message: 'Accion de prueba en el server '
    });

}
// Registrar Usuario 
function SaveUser(req,res){
var user = new User();
var profile = new Profile();
var params = req.body;
if(params.IdUsuario && params.Name && 
    params.Apellido && params.Username  && 
    params.Password  && params.Email && 
    params.Direccion && params.Telefono ){
        user.IdUsuario = params.IdUsuario;
        user.Name = params.Name;
        user.Apellido = params.Apellido;
        user.Username = params.Username;
        // Controlar Usuario de Duplicidad 
        User.find({ $or: [ 
                                {Email: user.Email},
                                {Username : user.Username}

        ]}).exec((err,users) =>{
          if(err) return res.status(500).send({message: 'Error Al Guardar Usuario ', err});
            if(users && users.length >= 1){
                return res.status(200).send({menssage: 'el Usuario que Deseas guardar ya Existe '})
            }else{
               
                bcrypt.hash(params.Password,null , null, (err,hash)=>{
                    user.Password = hash;
                    user.Email = params.Email;
                    user.Direccion = params.Direccion;
                    user.Telefono = params.Telefono;
                    user.Cod_Acompañante = '1047468022';
                    user.IdProfile = '000345',
                    user.Avatar = null;
                    user.status = params.status;
                    user.save((err,userStored) =>{
                        if(err) return res.status(500).send({message: 'Error Al guardar el Usuario ', err})
        
                        if(userStored){
                            res.status(200).send({user: userStored});
                        }else{
                            res.status(404).send({message : 'Usuario no se ha Registrado'});
                        }
                    });
                });
            }
        });

        
    }else{
        res.status(200).send({
            message: 'Porfavor Rellene Todos Los datos!!'
        });
    }

}

//MEtodo Iniciar Sesion
function LoginUser(req, res){
    var { Username, Password } = req.body;
    
    User.findOne(
        {    Username: Username}, (err , user) =>{
            if (err)  return res.status(500).send({menssage : 'error en la peticion'});

            if(user){
                bcrypt.compare(Password, user.Password, (err, ckeck) => {
                    if(ckeck){
                        if(params.gettoken){
                            // devolver Token && generar Token
                            return res.status(200).send({
                                token: jwt.CreateToken(user)
                            });
                        }else{

                            user.Password = undefined;
                            return res.status(200).send({user})

                        }
                   
                    }else{
                        return res.status(404).send({menssage: 'Usuario no se ha podpido identificar'});
                    }
                });
            }else{
                return res.status(404).send({menssage: 'Usuario no se ha podpido identificar'});
            }
        });
}
//Consultar usurio 
function GetUser(req, res){
    var user_id = req.params.IdUsuario;
    console.log({user_id});
    User.find({IdUsuario:user_id}, (err, user) => {
        console.log({user});
        if(err)  return res.status(500).send({message: 'Error en la peticion  aqui',err});
        if(!user) return res.status(404).send({message : 'El usuario no existe',err});
        return res.status(200).send({user});

    });


}

// listar Usarios
function LisUser (req ,res){
    var identity_User_id = req.user.sub;
    var page = 1;
    console.log({identity_User_id});
    if(req.params.page){
        page = req.params.page;
    }
     var itemsPerPage = 5;

     User.find().sort('IdUsuario').paginate(page,itemsPerPage, (err,users, total) =>{
            if(err) return res.status(500).send({message : 'Error en la Peticion'});

            if(!users) return res.status(404).send({message : 'no hay Usuario Disponibles'});


            return  res.status(200).send({
                users,
                total,
                page: Math.ceil(total/itemsPerPage)

            });
     });
}

// Actualizar Datos Usuario
function UpdateUser (req, res){
    var update = req.body;
    var userId = req.params.IdUsuario;
     // borrar Propiedad de la  Password
    delete update.Password;
   
    if(userId != req.user.sub){
            return res.status(500).send({message : 'No Tienes Permiso Para Actualizar los Datos Del usuario '});
    }

    User.findOneAndUpdate({IdUsuario: userId}, update,{new : true}, (err , userUpdated) => {
       
        if(err)  return  res.status(500).send({message : 'Error en la Peticion',err });

        if(!userUpdated) return res.status(404).send({message : 'No se ha podido Actualizar el usuario'});

        return res.status(200).send({user: userUpdated});

    }); 

}

// Subir Archivos De Imagen PAra el Avatar Usuario
function uploadimagen(req, res){
   var  userid = req.params.IdUsuario;
   
    if(req.files){
        var file_Path = req.files.Avatar.path;
        var file_split = file_Path.split('\\');
        var file_Name = file_split[2];
        var ext_split  = file_Name.split('\.');
        var file_ext  = ext_split[1];
            if(userid != req.user.sub){
               return removeFilesOfUploads(res,file_Path, 'No Tienes Permiso Para Actualizar los Datos Del usuario ');
             }
    

                 if(file_ext == 'png' || file_ext == 'jpg'){
                    // Actulizar Usurio  file 
                    User.findOneAndUpdate({IdUsuario :userid}, {Avatar : file_Name}, {new: true}, (err, userUpdated) => {
                        console.log(userid);
                        console.log(userUpdated);
                            if(err)  return  res.status(500).send({message : 'Error en la Peticion',err });

                            if(!userUpdated) return res.status(404).send({message : 'No se ha podido Actualizar el usuario'});

                             return res.status(200).send({user: userUpdated});

                    });
                     
                }else{
                   return removeFilesOfUploads(res ,file_Path, 'Extension no valida');

                     }
            

    }else{
        return res.status(200).send({menssage: 'no se ha enviado Imagen, Verifique'})
        }
}

function removeFilesOfUploads(res,file_Path, message){
    fs.unlink(file_Path, (err) =>{
        return res.status(200).send({menssage: 'Extencion del archivo no es valida'});
   });
}


function getImagenFile(req, res){
    var Avatar_File = req.params.Avatar;
    var path_file =  './Uploads/users/'+ Avatar_File;
    console.log(Avatar_File);
    console.log(req);
    fs.exists(path_file, (exists) => {
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message : ' Imagen No Existe '});
        }
    })

}

module.exports = {
    home,
    Prueba,
    SaveUser,
    LoginUser,
    GetUser,
    LisUser,
    UpdateUser,
    uploadimagen,
    getImagenFile
}
