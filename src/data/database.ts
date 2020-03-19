import mongodb from 'mongodb';

const mongoUrl = "mongodb://localhost:27017/sampan";
let theDb = null;

export function getDb(next: any) {
  if (!theDb) {

    // connect to the database
    mongodb.MongoClient.connect(mongoUrl, (err: any, db: any) => {
      if (err) {
        next(err, null);
      } else {
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