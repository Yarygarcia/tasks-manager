const UserCtl = {}
const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Controlador para crear/registar usuarios
UserCtl.registerUser = async( req, res )=>{

    try{
        const{ usuario, pwd } = req.body;

        const newUser = new User({ usuario, pwd });

        const usuarioExist = await User.findOne({ usuario: usuario });

        if(!usuario || !pwd){
            return res.status(400).json({messagge: "Existen campos que son requeridos"})
        }

        if(usuario.includes(' ')){
            return res.status(400).json({message: "Usuario no puede contener espacios"})
        }

        if( usuarioExist ){

           return res.status( 409 ).json({
                message: "Este usuario ya existe"
            });
        }
        
        newUser.pwd= await bcrypt.hash( pwd, 10 )
        //Token
        const token = jwt.sign({ usuario: newUser.usuario }, 'Secreta');
        //Guardar usuario
        await newUser.save()
        res.status( 200 ).json({
            message: "Usuario creado con éxito",
            token
        });
    
    }catch( error ){
        res.status(400).json({
            messaage: error
        });
    }
}
//Controlador para loguear un usuario
UserCtl.login = async( req, res )=>{

    try{
        const { usuario, pwd } = req.body;
        const usuarioExist = await User.findOne({ usuario: usuario });

        if( !usuario || !pwd ){
            return res.status(400).json({messagge: "Existen campos que son requeridos"})
        }

        if( usuario.includes(' ') ){
            return res.status(400).json({message: "Usuario no puede contener espacios"})
        }
        
        if( !usuarioExist ){
        
            return res.status( 404 ).json({
                message: "Usuario y/o contraseña incorrecta"
            })
        }
        
        const pwdMatch = await bcrypt.compare( pwd, usuarioExist.pwd );
        
        if( !pwdMatch ){
           return  res.status( 404 ).json({
                message: "Usuario y/o contraseña incorrecta"
            });
        }
        const token = jwt.sign({ usuario: usuarioExist.usuario }, 'Secreta');
        
        res.status( 200 ).json({
            mensage: "Has iniciado sesión exitosamente",
            token
        })   
        
    }catch( error ){
        res.status( 400 ).json({
            message: error
        })
    }
}

//Exportar modulo
module.exports = UserCtl