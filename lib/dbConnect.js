import { MongoClient, ServerApiVersion } from "mongodb";

export const collectionNamesObj = {
  servicesCollection: "test_services",
  userCollection: "test_user",
  bookingCollection: "test_booking"
}

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) throw new Error("Please add your Mongo URI to .env.local");
if (!dbName) throw new Error("Please add your DB_NAME to .env.local");

let cachedClient = null;

export default async function dbConnect(collectionName) {
  let globalWithMongo = global;

  if (process.env.NODE_ENV === "development") {
    if (!globalWithMongo._mongoClient) {
      globalWithMongo._mongoClient = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    }
    cachedClient = globalWithMongo._mongoClient;
  } else {
    if (!cachedClient) {
      cachedClient = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    }
  }

  // The MongoDB Node driver will lazily connect when the first operation is performed.
  return cachedClient.db(dbName).collection(collectionName);
}
