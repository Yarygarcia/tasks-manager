const express = require("express");
const router = express.Router();
const TaskCtrl = require('../controllers/TaskController');

/**
 * @swagger
 * components:
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
 *          required:
 *              - title
 */

/**
 * @swagger
 * /api/task:
 *  post:
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
router.post( '/task', TaskCtrl.crear );

/**
 * @swagger
 * /api/tasks:
 *  get:
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
router.get( '/tasks', TaskCtrl.listar );

/**
 * @swagger
 * /api/task/{id}:
 *   delete:
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
router.delete( '/task/:id', TaskCtrl.eliminarTarea );


/**
 * @swagger
 * /api/task/{id}:
 *   put:
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
router.put( '/task/:id', TaskCtrl.tareaCompleta );

//Exportar modulo
module.exports = router;