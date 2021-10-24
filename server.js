const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectId

MongoClient.connect(
  "mongodb+srv://karimhassan:mypassword@cluster0.byp1e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useUnifiedTopology: true }
)
  .then((client) => {
    console.log("Connected to Database");
    const db = client.db("star-wars-quotes");
    const quotesCollection = db.collection("quotes");
    app.set("view engine", "ejs");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(bodyParser.json());

    app.get("/", (req, res) => {
      //   res.sendFile(__dirname + "/index.html");
      db.collection("quotes")
        .find()
        .toArray()
        .then((results) => {
          res.render("index.ejs", { quotes: results });
        })
        .catch((error) => console.error(error));
    });

    app.put("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .findOneAndUpdate(
          { _id: new ObjectID(req.body._id) },
          {
            $set: {
              name: req.body.name,
              quote: req.body.quote,
            },
          },
          {
            upsert: false,
          }
        )
        .then((result) => {
          console.log(result);
          res.status(200).send('OK')
        })
        .catch((error) => console.error(error));
    });

    app.post("/quotes", (req, res) => {
      console.log(req.body);
      quotesCollection
        .insertOne(req.body)
        .then((result) => {
          console.log(result);
          res.redirect("/");
        })
        .catch((error) => console.error(error));
    });

    app.delete("/quotes", (req, res) => {
      db.collection("quotes").findOneAndDelete(
        { name: req.body.name },
        (err, result) => {
          if (err) return res.send(500, err);
          res.send("Message deleted!");
        }
      );
    });

    app.listen(4000, function () {
      console.log("listening on 4000");
    });
  })
  .catch((error) => console.error(error));
