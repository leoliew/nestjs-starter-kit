import { MongoClient } from 'mongodb';
import { getCredentials } from '../gcp-credentials';

interface Credentials {
  MONGODB_URI: string;
}

const credentials: Credentials = getCredentials();

const db = 'medicalRecords';
const coll = 'patients';
const connectionString = credentials.MONGODB_URI;

const regularClient = new MongoClient(connectionString, {});

async function main(): Promise<void> {
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

main().then(() => console.log('done'));
