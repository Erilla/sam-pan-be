import mongodb from 'mongodb';

const mongoUrl = "mongodb://localhost:27017";
let theDb = null;

export function getDb(next: any) {
  if (!theDb) {

    // connect to the database
    mongodb.MongoClient.connect(mongoUrl, { useUnifiedTopology: true } , (err: any, client: any) => {
      if (err) {
        next(err, null);
      } else {

        const db = client.db('sampan');

        theDb = {
          db,
          menuItems: db.collection("menuItems"),
          setMenus: db.collection("setMenus")
        };
        next(null, theDb);
      }
    });

  } else {
    next(null, theDb);
  }
}