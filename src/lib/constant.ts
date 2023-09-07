import * as config from 'config';

import {
  AssemblyConfig,
  OpenAIConfig,
} from '../common/interfaces/config.interface';
import { HttpStatus } from '@nestjs/common';

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
    [HttpStatus.OK]: 0,
    [HttpStatus.INTERNAL_SERVER_ERROR]: -1,
    [HttpStatus.NOT_FOUND]: -2,
    [HttpStatus.UNAUTHORIZED]: -3,
    [HttpStatus.FORBIDDEN]: -4,
    [HttpStatus.BAD_REQUEST]: -5,
    [HttpStatus.SERVICE_UNAVAILABLE]: -6,
  },

  RESPONSE_MESSAGE: {
    SUCCESS: 'success',
    ERROR: 'unknown error!',
    UNAUTHORIZED: 'access denied',
    BAD_REQUEST: 'bad request',
  },
};

export default Constant;
