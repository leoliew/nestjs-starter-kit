import * as config from 'config';

import {
  AssemblyConfig,
  OpenAIConfig,
} from '../common/interfaces/config.interface';

const assemblyConfig = config.get('assembly') as AssemblyConfig;
const openAIConfig = config.get('openai') as OpenAIConfig;

const Constant = {
  ASSEMBLY: {
    HOST: assemblyConfig.host,
    API_KEY: assemblyConfig.apiKey,
    TOKEN_EXPIRE: 3600,
  },
  OPENAI: {
    HOST: openAIConfig.host,
    API_KEY: openAIConfig.apiKey,
    NEED_PROXY: openAIConfig.needProxy,
    PROXY: openAIConfig.proxy,
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
    BAD_REQUEST: 'bad request',
  },
};

export default Constant;
