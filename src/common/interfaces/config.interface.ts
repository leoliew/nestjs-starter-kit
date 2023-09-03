export interface MongoDBConnection {
  name: string;
  mongodbURI: string;
  options: {
    useNewUrlParser: boolean;
    useUnifiedTopology: boolean;
  };
}

export interface AssemblyConfig {
  host: string;
  apiKey: string;
}

export interface OpenAIConfig {
  host: string;
  apiKey: string;
  needProxy: boolean;
  proxy: string;
}

export interface SwaggerConfig {
  swaggerUser: string;
  swaggerPassword: string;
}

export interface KMSConfig {
  gcpLocation: string;
  gcpKeyRing: string;
  gcpKeyName: string;
  gcpKeyVersion: string;
}

export interface CryptoConfig {
  algorithm: string;
  key: string;
  iv: string;
}

export interface AppConfig {
  port: number;
  mongodb: {
    debug: boolean;
    connections: MongoDBConnection[];
  };
  assembly: AssemblyConfig;
  openai: OpenAIConfig;
  swagger: SwaggerConfig;
  kms: KMSConfig;
  crypto: CryptoConfig;
}
