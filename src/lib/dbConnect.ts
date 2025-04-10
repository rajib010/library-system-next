import { MongoClient, Db } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI!);

let cachedDb: Db | null = null;

const dbConnection  = async function () {
  if (cachedDb) return cachedDb;

try {
    await client.connect();
    const db = client.db();
    if (db) console.log("Database connected successfully");
    cachedDb = db;
    return db;
} catch (error) {
  console.error("Error connecting to db", error)
}
};

export default dbConnection 