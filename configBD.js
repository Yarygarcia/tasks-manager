const mongoose = require('mongoose');
require('dotenv').config();

//Traemos la BD
URI = ( process.env.URL );

//Configuración para la base de datos Mongodb
mongoose.set( 'strictQuery', false )
mongoose.connect( URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then( db => console.log( "conectado a la base de datos: ", db.connection.name ))
.catch( ( err ) => err )


//Exportar modulo
module.exports = mongoose