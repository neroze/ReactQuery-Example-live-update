// server.js
const express = require("express");
const app = express();
const mongo = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const connect = require("./mono_connect");
var cors = require("cors"); // Cors
app.use(cors());

app.use(express.json());
let db, appleCollection;
const url = "mongodb://root:example@mongo:27017/";
mongo.connect(
  url,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, client) => {
    if (err) {
      console.error(err);
      return;
    }

    db = client.db("appleDB");
    appleCollection = db.collection("tweets");
    console.log("DB connected successfully.");
  }
);

app.get("/", (req, res) => {
  // console.log(db);
  // res.send({ success: true });
  //   appleCollection.insertOne({ title: "Tweet five" }, (err, result) => {
  //     !err && res.send({ success: true });
  //   });
  appleCollection.find().toArray((err, items) => {
    //   res.send({ success: true, items });
    res.send(items);
  });
  //   connect().then((item) => {
  //     console.log("item --?>", item.toArray());
  //     res.send(item);
  //   });
});

app.listen(3030, () => console.log("Example app is listening on port 3030."));
