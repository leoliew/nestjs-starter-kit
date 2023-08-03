const mongodb = require('mongodb');
const { MongoClient } = mongodb;

const { getCredentials } = require('../gcp-credentials');
credentials = getCredentials();

const db = 'medicalRecords';
const coll = 'patients';
const connectionString = credentials.MONGODB_URI;

const regularClient = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function main() {
  try {
    await regularClient.connect();
    const data = await regularClient
      .db(db)
      .collection(coll)
      .findOne({ name: /Jon/ });
    console.log(data);
    console.log(
      'Finding a document with encrypted client, searching on an encrypted field',
    );
  } finally {
    await regularClient.close();
  }
}
main().then((r) => console.log('done'));
