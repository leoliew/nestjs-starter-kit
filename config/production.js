module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    debug: false,
    connections: [
      {
        name: 'main',
        mongodbURI: process.env.MAIN_MONGODB_URI,
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
      {
        name: 'logs',
        mongodbURI: process.env.LOGS_MONGODB_URI,
        options: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      },
    ],
  },
};
