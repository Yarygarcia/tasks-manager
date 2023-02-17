const express = require('express');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const {swaggerDocs} = require('./src/v1/swagger')

dotenv.config();
//Traer la Bd
require('./configBD');
//Puerto
const puerto = process.env.PORT || 3000


app.use( morgan( 'dev' ) );
app.use( bodyparser.urlencoded( {extended:true} ));
app.use( bodyparser.json() );

//Rutas
app.use( '/', require( './src/routes' ) );

//Mostrar si el puerto está corriendo, el puerto en el que corre y la url de la documentación en swagger
app.listen( puerto, ()=>{ 
    console.log( `escuchando en el puerto ${puerto}` )
    swaggerDocs(app, puerto)
});