module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    debug: true,
    connections: [
      {
        name: 'main',
        mongodbURI: 'mongodb://localhost:27017/nestjs_test',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
      {
        name: 'logs',
        mongodbURI: 'mongodb://localhost:27017/nestjs_logs_test',
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    ],
  },
};
