import { MongoClient } from 'mongodb';
import { ClientEncryption } from 'mongodb-client-encryption';
import { getCredentials } from './gcp-credentials';

const credentials = getCredentials();

const provider = 'gcp';
const kmsProviders = {
  gcp: {
    email: credentials.GCP_EMAIL,
    privateKey: credentials.GCP_PRIVATE_KEY,
  },
};

const masterKey = {
  projectId: credentials.GCP_PROJECT_ID,
  location: credentials.GCP_LOCATION,
  keyRing: credentials.GCP_KEY_RING,
  keyName: credentials.GCP_KEY_NAME,
};

async function main(): Promise<void> {
  const uri = credentials.MONGODB_URI;
  const keyVaultDatabase = 'encryption';
  const keyVaultCollection = '__keyVault';
  const keyVaultNamespace = `${keyVaultDatabase}.${keyVaultCollection}`;
  const keyVaultClient = new MongoClient(uri);
  await keyVaultClient.connect();
  const keyVaultDB = keyVaultClient.db(keyVaultDatabase);
  await keyVaultDB.dropDatabase();
  await keyVaultClient.db('test1').dropDatabase();
  const keyVaultColl = keyVaultDB.collection(keyVaultCollection);
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    },
  );

  const client = new MongoClient(uri, {});
  await client.connect();

  const encryption = new ClientEncryption(client, {
    keyVaultNamespace,
    kmsProviders,
  });
  const key = await encryption.createDataKey(provider, {
    masterKey: masterKey,
    keyAltNames: ['demo'],
  });
  console.log('DataKeyId [base64]: ', key.toString('base64'));
  await keyVaultClient.close();
  await client.close();
}

main()
  .then(() => console.log('done'))
  .catch(console.dir);
