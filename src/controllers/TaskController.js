const TaskCtl = {}
const Task = require('../models/TaskModel');

//Controlador para crear tareas
TaskCtl.crear = async( req, res )=>{

    try{
        const { title, description, done } = req.body;
        const titulo = await Task.findOne({ title: title });
        const newTask = new Task({
            title, description, done
        });

        if( !title ){
            return res.status(400).json({message: "Titulo es requerido"})
        }

        if( titulo ){
           return  res.status( 409 ).json({
                message: "Tarea ya existe"
            });
        }

        await newTask.save();
        
        res.status( 200 ).json({
            message: "Nueva tarea creada",
            _id: newTask._id
        });
        

    }catch( error ){
        res.status( 400 ).json({
            message: error
        });
    }
}
//Controlador para listar tareas
TaskCtl.listar = async ( req,res )=>{

    try{
        const tasks = await Task.find();
        res.status( 200 ).json({
            tasks
        });

    }catch( error ){
        res.status( 400 ).json({
            message:error
        });
    }
}

//Controlador para eliminar una tarea por su id
TaskCtl.eliminarTarea = async( req,res )=>{

    const id = req.params.id
    
    try{
        const task = await Task.findByIdAndRemove({ _id:id })
        if( !task ){

           return res.status( 404 ).json({
                message: "Tarea no existe"
            });
        }

        return res.status( 200 ).json({
            message:"Tarea eliminada"
        });
    

    }catch( error ){
        res.status( 400 ).json({
            message: error
        });
    }
}

//Controlador para marcar una tarea como completa por su id
TaskCtl.tareaCompleta = async ( req,res ) =>{

    try{
        const id = await Task.findOne({ _id: req.params.id });

        if( !id ){

            return res.status( 404 ).json({
                message: "Tarea no existe"
            });
        }
        
        const doneTask = id.done === false ? true : true;
        await Task.updateOne({ _id : req.params.id }, { done : doneTask });

        return res.status( 200 ).json({
            message: "Tarea marcada como completa"
        });

    }catch( error ){
        res.status( 400 ).json({
            message:error
        });
    }
}
//Exportar modulo
module.exports = TaskCtl;
