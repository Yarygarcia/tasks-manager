const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema ({

//Modelo de la base de datos de las tareas
    title:{
        type:String,
        required:[ true, "Título requerido" ],
        unique: true,
        minlenght:[ 1, "Título: mínimo 1 caracteres" ],
        maxlength: [ 50, "Titulo: Máximo 50 caracteres" ]
    },
    description:{
        type: String,
        minlenght: [ 0, "Descripción: mínimo 0 caracteres" ],
        maxlength: [ 150, "Descripción: Máximo 150 caracteres" ]
    },
    done:{
        type:Boolean,
        default:false
    },
    date:{
        type: Date,
        default: Date.now
    }

});
//Le asignamos el nombre a la BD en donde se ingresaran las tareas, la convertimos a modelo y la exportamos 
module.exports = mongoose.model( 'task', taskSchema );