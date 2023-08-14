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
  kms: {
    gcp_location: 'australia-southeast1',
    gcp_key_ring: 'sample',
    gcp_key_name: 'sample',
    gcp_key_version: '1',
  },
  crypto: {
    algorithm: 'AES-256-CBC',
    key: '5Mqxo6NUuJcUr4DpS56nmConIQH9ulTd',
    iv: '5007063684459988',
  },
};
