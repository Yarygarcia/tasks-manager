const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema ({

//Modelo de la Base de datos de los Usuarios
    usuario:{
        type:String,
        required:[ true, "Usuario requrido" ],
        minlenght:[ 4, "usuario: mínimo 4 caracteres" ],
        maxlength: [ 30, "usuario: Máximo 30 caracteres" ],
        unique: true
        
    },
    pwd:{
        type: String,
        required: [ true, "Contraseña requerida" ],
        minlenght: [ 6, "Contraseña: mínimo 6 caracteres" ],
        maxlength: [ 1000, "Contraseña: Máximo 1000 caracteres" ]
    },

});
//Le asignamos el nombre a la BD en donde se ingresaran los usuarios, la convertimos a modelo y la exportamos 
module.exports = mongoose.model( 'user', userSchema );
