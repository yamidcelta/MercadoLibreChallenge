let swaggerDefinition = {
    info: {
        title: 'documentación swagger',
        version: '1.0.0',
        description: 'documentación inicial del servicio Mutant'
    },
    host: "localhost:3002",
    basePath: "/",
   
};

export const swaggerOptions = {
    swaggerDefinition,
    apis: [__dirname + '/../../api/routes/*.js']
};