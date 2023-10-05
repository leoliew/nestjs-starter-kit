import gcpCredentials from './private_key.json';
import config from 'config';

interface KMSConfig {
  gcpLocation: string;
  gcpKeyRing: string;
  gcpKeyName: string;
  gcpKeyVersion: string;
}

interface Credentials {
  MONGODB_URI: string;
  SHARED_LIB_PATH: string;
  GCP_EMAIL: string;
  GCP_PRIVATE_KEY: string;
  GCP_PROJECT_ID: string;
  GCP_LOCATION: string;
  GCP_KEY_RING: string;
  GCP_KEY_NAME: string;
  GCP_KEY_VERSION: string;
}

function pemToBase64(pemKey: string): string {
  const startMarker = '-----BEGIN PRIVATE KEY-----';
  const endMarker = '-----END PRIVATE KEY-----';
  const keyContent = pemKey.substring(
    pemKey.indexOf(startMarker) + startMarker.length,
    pemKey.indexOf(endMarker),
  );
  return keyContent.replace(/\n/g, '').replace(/\s/g, '');
}

const kmsConfig: KMSConfig = config.get('kms');

const credentials: Credentials = {
  MONGODB_URI:
    'mongodb+srv://docnow:docnow@test.m4jmtka.mongodb.net/test?retryWrites=true&w=majority',
  SHARED_LIB_PATH:
    '/Users/Leo/Develop/project/nestjs/docs-in-use-encryption-examples/csfle/bin/mongocryptd',
  GCP_EMAIL: gcpCredentials.client_email,
  GCP_PRIVATE_KEY: pemToBase64(gcpCredentials.private_key),
  GCP_PROJECT_ID: gcpCredentials.project_id,
  GCP_LOCATION: kmsConfig.gcpLocation,
  GCP_KEY_RING: kmsConfig.gcpKeyRing,
  GCP_KEY_NAME: kmsConfig.gcpKeyName,
  GCP_KEY_VERSION: kmsConfig.gcpKeyVersion,
};

function checkForPlaceholders(): void {
  const errorBuffer: string[] = [];
  const placeholderPattern = /^<.*>$/;
  for (const [key, value] of Object.entries(credentials)) {
    if (`${value}`.match(placeholderPattern)) {
      const errorMessage = `You must fill out the ${key} field of your credentials object.`;
      errorBuffer.push(errorMessage);
    } else if (value === undefined) {
      const errorMessage = `The value for ${key} is empty. Please enter something for this value.`;
      errorBuffer.push(errorMessage);
    }
  }
  if (errorBuffer.length > 0) {
    const message = errorBuffer.join('\n');
    throw new Error(message);
  }
}

function getCredentials(): Credentials {
  checkForPlaceholders();
  return credentials;
}

export { getCredentials };
