import * as config from 'config';

const Constant = {
  ASSEMBLY: {
    HOST: config.get('assembly.host'),
    API_KEY: config.get('assembly.apiKey'),
    TOKEN_EXPIRE: 3600,
  },
  OPENAI: {
    HOST: config.get('openai.host'),
    API_KEY: config.get('openai.apiKey'),
    NEED_PROXY: config.get('openai.needProxy'),
    PROXY: config.get('openai.proxy'),
  },
  MONGODB: {
    MAIN: 'main',
    LOGS: 'logs',
  },

  CUSTOM_RESPONSE_CODE: {
    SUCCESS: 0,
    ERROR: -1,
    NOT_FOUND: -2,
    UNAUTHORIZED: -3,
    FORBIDDEN: -4,
    BAD_REQUEST: -5,
    SERVICE_UNAVAILABLE: -6,
  },

  RESPONSE_MESSAGE: {
    SUCCESS: 'success',
    ERROR: 'unknown error!',
    UNAUTHORIZED: 'access denied',
  },
};

export default Constant;
