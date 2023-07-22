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
};
