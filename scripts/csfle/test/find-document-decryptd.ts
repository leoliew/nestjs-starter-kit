import { MongoClient } from 'mongodb';
import { getCredentials } from '../gcp-credentials';

interface Credentials {
  MONGODB_URI: string;
  GCP_EMAIL: string;
  GCP_PRIVATE_KEY: string;
  SHARED_LIB_PATH: string;
}

const credentials: Credentials = getCredentials();

const db = 'medicalRecords';
const coll = 'patients';
const namespace = `${db}.${coll}`;

const kmsProviders = {
  gcp: {
    email: credentials.GCP_EMAIL,
    privateKey: credentials.GCP_PRIVATE_KEY,
  },
};

const connectionString = credentials.MONGODB_URI;

const keyVaultNamespace = 'encryption.__keyVault';

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

const patientSchema: { [key: string]: object } = {};
patientSchema[namespace] = schema;

const extraOptions = {
  mongocryptdSpawnPath: credentials.SHARED_LIB_PATH,
};

console.log(extraOptions);

const secureClient = new MongoClient(connectionString, {
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    schemaMap: patientSchema,
    extraOptions: extraOptions,
  },
});

async function main(): Promise<void> {
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

main().then(() => console.log('done'));
