const Auth={}
const jwt = require('jsonwebtoken')

//Verificar si hay token y si este no es null
Auth.verificar = async(req,res, next) =>{
    const token = req.headers.autorizacion
    if(!token || token === null){
        return res.status(401).json({
            message: "No estas autorizado"
        })
    }

    jwt.verify(token, 'Secreta', (err)=>{
        if(err){
            return res.status(401).json({
                message: "No estas autorizado"
            })
        }
        next();
    })
   
}
//Exportar modulo
module.exports = Auth