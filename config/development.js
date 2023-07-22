module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    debug: true,
    mongodbURI: 'mongodb://localhost:27017/nestjs_dev',
  },
};
