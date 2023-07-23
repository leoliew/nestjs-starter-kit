module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    debug: true,
    connections: [
      {
        name: 'main',
        mongodbURI: 'mongodb://localhost:27017/nestjs_dev',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
      {
        name: 'logs',
        mongodbURI: 'mongodb://localhost:27017/nestjs_logs_dev',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    ],
  },
  assembly: {
    host: 'https://api.assemblyai.com',
    apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
  openai: {
    host: 'https://api.openai.com',
    apiKey: 'sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    needProxy: false,
    proxy: 'http://127.0.0.1:7890',
  },
  swagger: {
    swagger_user: 'user',
    swagger_password: 'pass',
  },
};
