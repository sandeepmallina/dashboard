// const { MongoClient } = require("mongodb");
import { MongoClient } from "mongodb";
// require("dotenv").config();
export const handler = async (event) => {
  try {
    // Replace with your MongoDB connection string
    const uri = MONGO_URI;

    const client = new MongoClient(uri, { useNewUrlParser: true });

    await client.connect();

    const database = client.db(MONGO_DATABASE);
    const collection = database.collection(MONGO_COLLECTION);

    const data = await collection.find({}).toArray();

    client.close();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify(data), // Convert data to JSON
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json", // Set the content type to JSON
      },
      body: JSON.stringify({ error: error.message }), // Convert error to JSON
    };
  }
};
