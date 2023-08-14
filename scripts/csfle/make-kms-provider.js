const mongodb = require('mongodb');
const { ClientEncryption } = require('mongodb-client-encryption');
const { MongoClient, Binary } = mongodb;

const { getCredentials } = require('./gcp-credentials');
credentials = getCredentials();

// start kms providers
const provider = 'gcp';
const kmsProviders = {
  gcp: {
    email: credentials['GCP_EMAIL'],
    privateKey: credentials['GCP_PRIVATE_KEY'],
  },
};
// end kms providers

// start - data key opts
const masterKey = {
  projectId: credentials['GCP_PROJECT_ID'],
  location: credentials['GCP_LOCATION'],
  keyRing: credentials['GCP_KEY_RING'],
  keyName: credentials['GCP_KEY_NAME'],
};
// end- data key opts

async function main() {
  // start-create-index
  const uri = credentials.MONGODB_URI;
  const keyVaultDatabase = 'encryption';
  const keyVaultCollection = '__keyVault';
  const keyVaultNamespace = `${keyVaultDatabase}.${keyVaultCollection}`;
  const keyVaultClient = new MongoClient(uri);
  await keyVaultClient.connect();
  const keyVaultDB = keyVaultClient.db(keyVaultDatabase);
  // Drop the Key Vault Collection in case you created this collection
  // in a previous run of this application.
  // await keyVaultDB.dropDatabase();
  // Drop the database storing your encrypted fields as all
  // the DEKs encrypting those fields were deleted in the preceding line.
  // TODO: not necessary to delete the database
  await keyVaultClient.db('test1').dropDatabase();
  const keyVaultColl = keyVaultDB.collection(keyVaultCollection);
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    },
  );
  // end-create-index

  // start-create-dek
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await client.connect();

  const encryption = new ClientEncryption(client, {
    keyVaultNamespace,
    kmsProviders,
  });
  const key = await encryption.createDataKey(provider, {
    masterKey: masterKey,
    // TODO : change to db name
    keyAltNames: ['demo'],
  });
  console.log('DataKeyId [base64]: ', key.toString('base64'));
  await keyVaultClient.close();
  await client.close();
  // end-create-dek
}
main()
  .then((r) => console.log('done'))
  .catch(console.dir);