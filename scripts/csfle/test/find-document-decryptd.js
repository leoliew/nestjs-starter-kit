const mongodb = require('mongodb');
const { ClientEncryption } = require('mongodb-client-encryption');
const { MongoClient, Binary } = mongodb;

const { getCredentials } = require('../gcp-credentials');
const { ObjectId } = require('mongodb');
credentials = getCredentials();

var db = 'medicalRecords';
var coll = 'patients';
var namespace = `${db}.${coll}`;
// start-kmsproviders
const kmsProviders = {
  gcp: {
    email: credentials['GCP_EMAIL'],
    privateKey: credentials['GCP_PRIVATE_KEY'],
  },
};
// end-kmsproviders

const connectionString = credentials.MONGODB_URI;

// start-key-vault
const keyVaultNamespace = 'encryption.__keyVault';
// end-key-vault

// start-schema
const schema = {
  bsonType: 'object',
  encryptMetadata: {
    keyId: '/key-id',
  },
  properties: {
    insurance: {
      bsonType: 'object',
      properties: {
        policyNumber: {
          encrypt: {
            bsonType: 'int',
            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
          },
        },
      },
    },
    medicalRecords: {
      encrypt: {
        bsonType: 'array',
        algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
      },
    },
    bloodType: {
      encrypt: {
        bsonType: 'string',
        algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
      },
    },
    ssn: {
      encrypt: {
        bsonType: 'int',
        algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random',
      },
    },
  },
};

var patientSchema = {};
patientSchema[namespace] = schema;
// end-schema

// start-extra-options
const extraOptions = {
  // mongocryptdSpawnPath: credentials["MONGOCRYPTD_PATH"],
  mongocryptdSpawnPath: credentials.SHARED_LIB_PATH,
};

console.log(extraOptions);
// end-extra-options

// start-client
const secureClient = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    schemaMap: patientSchema,
    extraOptions: extraOptions,
  },
});

async function main() {
  try {
    await secureClient.connect();
    console.log(
      'Finding a document with encrypted client, searching on an encrypted field',
    );
    const data = await secureClient
      .db(db)
      .collection(coll)
      .findOne({ name: /Jon/ });
    console.log(data);
  } finally {
    await secureClient.close();
  }
}
main().then((r) => console.log('done'));
