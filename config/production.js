module.exports = {
  port: process.env.PORT || 3000,
  mongodb: {
    debug: false,
    mongodbURI:
      process.env.MONGODB_URI || 'mongodb://localhost:27017/nestjs_dev',
  },
};
