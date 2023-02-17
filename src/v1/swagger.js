const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const path = require('path')

//Información del proyecto
const swagger={
    definition:{
        openapi:"3.0.0",
        info:{
            title: "task manager",
            version: "1.0.0"
        },
        servers:[
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [`${path.join(__dirname,"../routes/*.js")}`]
}

//Implementación de la documentación en swagger
const swaggerSpec = swaggerJSDoc( swagger );

const swaggerDocs = ( app,port ) => {
    app.use( '/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec) );

    console.log(`http://localhost:${port}/api/docs`)
}
//Exportar modulo
module.exports = {swaggerDocs};

