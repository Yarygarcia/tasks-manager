const express = require("express");
const router = express.Router();
const TaskCtrl = require('../controllers/TaskController');
const token = require('../helpers/Auth')

/**
 * @swagger
 * components:
 *    securitySchemes:
 *      ApiTokenss:
 *          type: apiKey
 *          in: header
 *          name: autorizacion
 *    schemas:
 *      Task:
 *          type: object
 *          properties:
 *              title:
 *                  type: string
 *                  description: Titulo de la tarea
 *              description:
 *                  type: string
 *                  description: Descripción de la tarea
 *              
 *          required:
 *              - title
 */

/**
 * @swagger
 * /api/task:
 *  post:
 *      security:
 *          - ApiTokenss: []
 *      summary: Crear una tarea
 *      tags: [Task]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/Task'
 *      responses:
 *          200:
 *              description: Tarea creada con exito
 *          409:
 *              description: Tarea ya existe
 *      
 */
//ruta para crear  tareas
router.post( '/task', token.verificar,TaskCtrl.crear );

/**
 * @swagger
 * /api/tasks:
 *  get:
 *      security:
 *          - ApiTokenss: []
 *      summary: Leer todas las tareas
 *      tags: [Task]
 *      responses:
 *          200:
 *              description: Todas las tareas
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items: 
 *                              $ref: '#/components/schemas/Task'
 */
//ruta para listar todas las tareas
router.get( '/tasks', token.verificar,TaskCtrl.listar );

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
 *      security:
 *          - ApiTokenss: []
 *      summary: Eliminar una tarea por su id
 *      tags: [Task]
 *      parameters:
*        - in : path
 *          name : id
 *          required: true
 *          schema: 
 *              type: string
 *          description: id de la tarea
 *      responses:
 *          200:
 *              description: Tarea eliminada con exito
 *          404:
 *              description: Tarea no existe
 *              
 */
//ruta para eliminar una tarea por su id
router.delete( '/task/:id', token.verificar, TaskCtrl.eliminarTarea );


/**
 * @swagger
 * /api/task/{id}:
 *   put:
 *      security:
 *          - ApiTokenss: []
 *      summary: Marcar tarea como hecha
 *      tags: [Task]
 *      parameters:
*        - in : path
 *          name : id
 *          required: true
 *          schema: 
 *              type: string
 *          description: Tarea completada
 *      responses:
 *          200:
 *              description: Tarea completada con exito
 *          404:
 *              description: Tarea no existe
 *              
 */
//Ruta de completar una tarea con su id
router.put( '/task/:id', token.verificar, TaskCtrl.tareaCompleta );

//Exportar modulo
module.exports = router;