const express = require('express');
const router = express.Router();
const taskRouter = require('./taskRouter');
const userRouter = require('./userRouter');


//Rutas de TaskRouter.js
router.use( '/api', taskRouter );

//Rutas de userRouter.js
router.use( '/user', userRouter );

//Exportar modulo
module.exports= router;