const fs = require('fs');
const gcpCredentials = require('./private_key.json');
const config = require('config');
const kmsConfig = config.get('kms');

/*
return credentials object and ensure it has been populated
**/
function getCredentials() {
  checkForPlaceholders();
  return credentials;
}

function pemToBase64(pemKey) {
  // 提取私钥内容
  const startMarker = '-----BEGIN PRIVATE KEY-----';
  const endMarker = '-----END PRIVATE KEY-----';
  const keyContent = pemKey.substring(
    pemKey.indexOf(startMarker) + startMarker.length,
    pemKey.indexOf(endMarker),
  );
  // 去除换行符和空格
  return keyContent.replace(/\n/g, '').replace(/\s/g, '');
}

const credentials = {
  // Mongo Paths + URI
  MONGODB_URI:
    //TODO:正式环境修改
    'mongodb+srv://docnow:docnow@test.m4jmtka.mongodb.net/test?retryWrites=true&w=majority',
  // MONGODB_URI: "mongodb://localhost:27017/test",
  // TODO:读取 docker
  SHARED_LIB_PATH:
    '/Users/Leo/Develop/project/nestjs/docs-in-use-encryption-examples/csfle/bin/mongocryptd',

  // GCP Credentials
  GCP_EMAIL: gcpCredentials.client_email,
  GCP_PRIVATE_KEY: pemToBase64(gcpCredentials.private_key),
  GCP_PROJECT_ID: gcpCredentials.project_id,
  GCP_LOCATION: kmsConfig.gcp_location,
  GCP_KEY_RING: kmsConfig.gcp_key_ring,
  GCP_KEY_NAME: kmsConfig.gcp_key_name,
  GCP_KEY_VERSION: kmsConfig.gcp_key_version,
};

/*
check if credentials object contains placeholder values
**/
function checkForPlaceholders() {
  const errorBuffer = Array();
  const placeholderPattern = /^<.*>$/;
  for (const [key, value] of Object.entries(credentials)) {
    // check for placeholder text
    if (`${value}`.match(placeholderPattern)) {
      let errorMessage = `You must fill out the ${key} field of your credentials object.`;
      errorBuffer.push(errorMessage);
    }
    // check if value is empty
    else if (value === undefined) {
      let errorMessage = `The value for ${key} is empty. Please enter something for this value.`;
      errorBuffer.push(errorMessage);
    }
  }
  // raise an error if errors in buffer
  let message;
  if (errorBuffer.length > 0) {
    message = errorBuffer.join('\n');
    throw message;
  }
}

module.exports = { getCredentials };
