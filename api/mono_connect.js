const { MongoClient } = require("mongodb");

const username = encodeURIComponent("appledb");
const password = encodeURIComponent("ZbLNgj6waEzoXRFi");

let uri = `mongodb+srv://${username}:${password}@cluster0.9az4xwx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("tweetsDB");
    const ratings = database.collection("tweets");

    const cursor = ratings.find();

    return await cursor;
  } finally {
    await client.close();
  }
}

module.exports = run;
