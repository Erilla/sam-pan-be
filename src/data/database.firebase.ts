import * as admin from 'firebase-admin';

// tslint:disable-next-line: no-var-requires
const serviceAccount = require('../../serviceAccountKey.json');

let theDb = null;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sam-pan-takeaway.firebaseio.com"
});

export function getDb(next: any) {
    const database = admin.app().database();

    next(null, database);
}