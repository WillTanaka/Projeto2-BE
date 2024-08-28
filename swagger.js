const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger_output.json';
const endpointsFiles = ['./app.js'];

const doc = {
    info: {
        title: 'BEWT Filmes API',
        description: 'API para gerenciamento de filmes, salas e sessões.',
    },
    host: 'localhost:3000',
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./bin/www'); // Ou o arquivo que você usa para inicializar o servidor
});