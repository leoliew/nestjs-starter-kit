const fs = require('fs');
const gcpCredentials = require('./private_key.json');

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

// 读取私钥文件
const pemKey = fs.readFileSync('private_key_3.pem', 'utf-8');

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
  GCP_EMAIL: 'kms-dev@docnow-au.iam.gserviceaccount.com',
  GCP_PRIVATE_KEY: pemToBase64(gcpCredentials.private_key),
  GCP_PROJECT_ID: 'docnow-au',
  GCP_LOCATION: 'australia-southeast1',
  GCP_KEY_RING: 'sample',
  GCP_KEY_NAME: 'sample',
  GCP_KEY_VERSION: '1',
};

/*
check if credentials object contains placeholder values
**/
function checkForPlaceholders() {
  const errorBuffer = Array();
  const placeholderPattern = /^<.*>$/;
  let errorMessage;
  let error_message;
  for (const [key, value] of Object.entries(credentials)) {
    // check for placeholder text
    if (`${value}`.match(placeholderPattern)) {
      errorMessage = `You must fill out the ${key} field of your credentials object.`;
      errorBuffer.push(errorMessage);
    }
    // check if value is empty
    else let error_message;
    if (value === undefined) {
      error_message = `The value for ${key} is empty. Please enter something for this value.`;
    }
  }
  // raise an error if errors in buffer
  let message;
  if (errorBuffer.length > 0) {
    message = errorBuffer.join("\n");
    throw message;
  }
}

module.exports = { getCredentials };
