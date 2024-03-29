module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    debug: true,
    connections: [
      {
        name: 'main',
        mongodbURI:
          process.env.CORE_MONGODB_URI ||
          'mongodb://localhost:27017/nestjs_dev',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
      {
        name: 'logs',
        mongodbURI:
          process.env.LOG_MONGODB_URI ||
          'mongodb://localhost:27017/nestjs_logs_dev',
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
    swaggerUser: 'user',
    swaggerPassword: 'pass',
  },
  kms: {
    gcpLocation: 'australia-southeast1',
    gcpKeyRing: 'sample',
    gcpKeyName: 'sample',
    gcpKeyVersion: '1',
  },
  crypto: {
    algorithm: 'AES-256-CBC',
    key: '5Xxxo6XXxxXXr4XxX11nxXonXXX9xxXx',
    iv: '1007063684450000',
  },
};
