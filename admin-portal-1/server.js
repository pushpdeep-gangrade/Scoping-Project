const express = require('express');
const http = require('http');
const port = process.env.PORT || 5000;
const app = express();

const cors = require('cors');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://Pushp:pushp@a-mad-cluster.1u5jl.mongodb.net/API?retryWrites=true&w=majority";

app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());

//Status encoded
const OK = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const CONFLICT = 403;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

//API code goes here

//Create Examiner With Passed Information (POST)
app.post('/v1/examiner/create', (req, res) => {
    if (typeof req.body.firstname === "undefined" || typeof req.body.lastname === "undefined" || typeof req.body.age === "undefined" ||
      typeof req.body.address === "undefined" || typeof req.body.email === "undefined") {
      res.status(BAD_REQUEST).send("Bad request Check parameters or Body");
    } else {
        client = new MongoClient(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        });
        client.connect().then(() => {
          var myobj = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age: req.body.age,
            address: req.body.address,
            email: req.body.email,
            qrcode: "BLANK"
          };
          client.db('Scoping').collection('Examiner').insertOne(myobj, function(err, result) {
            if (err)
                res.status(INTERNAL_SERVER_ERROR).send(err);
            else if (result.insertedCount == 1) {
                res.status(OK).send("Signed up Successfully");
                console.log(result.insertedId);
            }
                return client.close();
            })
        });
    }
});

//Delete Examiner (DELETE)
app.delete('/v1/examiner/delete', (req, res) => {
    console.log("delete examiner: " + req.encode);
    client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    client.connect().then(() => {
      //Delete examiner
      client.db('Scoping').collection('Examiner').deleteOne({
        firstname: req.body.firstname,
        lastname: req.body.lastname
      }, (err, result) => {
          if (err) {
              console.log(err);
          }
          else {
              //console.log(result);
              res.status(OK).send("Deleted " + result.deletedCount + " examiners.");
          }
      });
    });
  });

//Retrive All Examiners Information (GET)
app.get('/v1/examiner/get-all', function(req, res) {
    console.log("get-all: " + req.encode);
    client = new MongoClient(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    client.connect().then(() => {
        client.db('Scoping').collection('Examiner').find({}).toArray(function(err, result) {
            if (err) {
                console.log(err);
            }
            else {
                res.status(OK).send(result);
            }
            return client.close();
        });
    });
});

http.createServer(app).listen(port, function (){
    console.log("Listening on port " + port);
})