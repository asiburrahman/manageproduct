// // app/lib/dbConnect.js
// import { MongoClient, ServerApiVersion } from "mongodb";

// const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
// const dbName = process.env.DB_NAME;

// if (!uri) throw new Error("MONGODB_URI not set");
// if (!dbName) throw new Error("DB_NAME not set");

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true
//   }
// });

// let cachedDb = null;

// export default async function dbConnect(collectionName) {
 
  
//   if (!cachedDb) {
//     await client.connect();
//     cachedDb = client.db(dbName);
//   }

//   return cachedDb.collection(collectionName);
// }


import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNamesObj = {
    servicesCollection: "test_services",
    userCollection: "test_user",
    bookingCollection: "test_booking"
}

export default function dbConnect(collectionName) {
    const uri = process.env.NEXT_PUBLIC_MONGODB_URI
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client.db(process.env.DB_NAME).collection(collectionName)
}
