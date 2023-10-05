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

const regularClient = new MongoClient(connectionString, {});

async function main(): Promise<void> {
  try {
    await regularClient.connect();
    try {
      await secureClient.connect();
      try {
        await secureClient
          .db(db)
          .collection(coll)
          .insertOne({
            createdAt: new Date(),
            name: 'Jon Doeeeee',
            ssn: 241014209,
            bloodType: 'AB+',
            'key-id': 'demo-data-key',
            medicalRecords: [{ weight: 180, bloodPressure: '120/80' }],
            insurance: {
              policyNumber: 123142,
              provider: 'MaestCare',
            },
          });
      } catch (writeError) {
        console.error('writeError occurred:', writeError);
      }

      console.log('Finding a document with regular (non-encrypted) client.');
      console.log(
        await regularClient.db(db).collection(coll).findOne({ name: /Jon/ }),
      );

      console.log(
        'Finding a document with encrypted client, searching on an encrypted field',
      );
      console.log(
        await secureClient.db(db).collection(coll).findOne({ name: /Jon/ }),
      );
    } finally {
      await secureClient.close();
    }
  } finally {
    await regularClient.close();
  }
}

main();
