// src/swaggerConfig.ts
import swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Ejemplo',
      version: '1.0.0',
      description: 'Documentación generada automáticamente con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3030',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.ts'], // Ruta a los archivos de rutas
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);