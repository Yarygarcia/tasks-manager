const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/UserController');

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *          type: object
 *          properties:
 *              usuario:
 *                  type: string
 *                  description: El nombre de usuario
 *              pwd:
 *                  type: string
 *                  description: La contraseña del usuario
 *          required:
 *              - usuario
 *              - pwd
 */

/**
 * @swagger
 * /user/login:
 *  post:
 *      summary: Logeo de usuario con sus respectivas propiedades (usuario , pwd)
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: logueo exitoso
 *          404:
 *              description: Usuario no encontrado, error en el user o pwd
 *      
 */
//ruta para el logueo de usuarios
router.post( '/login', userControllers.login );

/**
 * @swagger
 * /user/usuario:
 *  post:
 *      summary: Registro de usuarios con sus respectivas propiedades (usuario , pwd)
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          200:
 *              description: Usuario registrado con exito
 *          409:
 *              description: Usuario ya existe
 *      
 */
//ruta para el registro de usuarios
router.post( '/usuario', userControllers.registerUser );

//Exportar modulo
module.exports = router;