import * as config from 'config';
import * as path from 'path';

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

  // App error template
  APP_ERROR_CODE: {
    // Transcript error
    TRANSCRIPT_TOO_SHORT: -1000,
    TRANSCRIPT_TOKEN_LIMIT: -1001,
    TRANSCRIPT_NOT_FOUND: -1002,
    // File handle error
    WRITE_BUFFER_ERROR: -1100,
    FILE_UPLOAD_ERROR: -1101,
    // Template error
    SYSTEM_TEMPLATE_NOT_FOUND: -1200,
    USER_TEMPLATE_NOT_FOUND: -1201,
    // AI error
    FUNCTION_CALL_ERROR: -1300,
    OPEN_AI_CALL_ERROR: -1301,
    OPEN_AI_SUMMARY_CALL_ERROR: -1302,
    // System Data error
    SYSTEM_DATA_NOT_FOUND: -1400,
    // unknown error
    UNKNOWN_ERROR: -9999,
  },

  PATH: {
    ROOT_PATH: path.resolve(__dirname, '..'),
  },
};

export default Constant;
