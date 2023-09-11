const { MongoClient } = require("mongodb");

exports.handler = async (event) => {
  try {
    // Replace with your MongoDB connection string
    const uri =
      "mongodb+srv://admin:admin1234@nodeapi.mymkg3q.mongodb.net/?retryWrites=true&w=majority>";

    const client = new MongoClient(uri, { useNewUrlParser: true });

    await client.connect();

    const database = client.db("data");
    const collection = database.collection("variables");

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
