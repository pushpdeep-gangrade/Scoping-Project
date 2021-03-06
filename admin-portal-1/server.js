const express = require('express');
const http = require('http');
const port = process.env.PORT || 5000;
const app = express();

const cors = require('cors');
const jwt = require('jsonwebtoken');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;
const QRCode = require('qrcode')
const url = "mongodb+srv://Pushp:pushp@a-mad-cluster.1u5jl.mongodb.net/API?retryWrites=true&w=majority";

app.use(cors());

var bodyParser = require('body-parser');
const { log } = require('console');
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

//middleware for jwt verification

var authMiddleware = function (req, res, next) {
    try {
        if (!req.headers.authorizationkey) {
            res.status(UNAUTHORIZED).send("UNAUTHORIZED");
        } else {
            var decode = jwt.decode(req.headers.authorizationkey);
            jwt.verify(req.headers.authorizationkey, 'secret', function (err, decoded) {
                if (err) {
                    console.log(err);
                    res.status(BAD_REQUEST).send(err.message);
                } else {
                    if (decoded.u_id == decode.u_id) {
                        req.encode = decoded.u_id;
                        req.encode_first = decode.u_first;
                        req.encode_last = decode.u_last;
                        next();
                    } else
                        console.log("fail");
                }
            });
        }
    } catch (err) {
        res.send(err);
    }
}

var authTeams = function (req, res, next) {
    // console.log(req.headers);
    try {
        if (!req.headers.teamid) {
            res.status(UNAUTHORIZED).send("UNAUTHORIZED");
        } else {
            var decode = jwt.decode(req.headers.teamid);
            jwt.verify(req.headers.teamid, 'secret', function (err, decoded) {
                if (err) {
                    res.status(BAD_REQUEST).send(err.message);
                } else {
                    console.log(decoded)
                    if (decoded.u_id == decode.u_id) {
                        req.encode_teamId = decoded.u_id;
                        next();
                    } else
                        console.log("fail");
                }
            });
        }
    } catch (err) {
        res.send(err);
    }
}


// admin login without password encyption check
app.post('/v1/admin/login', function (req, res) {
    if (typeof req.body.email === "undefined" || typeof req.body.password === "undefined") {
        res.status(BAD_REQUEST).send("Bad request Check request Body");
    } else {
        client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.connect().then(() => {
            var myObj = {
                emailId: req.body.email,
            };
            client.db('Scoping').collection('Admin').findOne(myObj, function (err, result) {
                //console.log(result._id);
                if (err)
                    res.status(INTERNAL_SERVER_ERROR).send(err);
                else if (result == null)
                    res.status(OK).send("No such user found");
                else if (result != null && req.body.password === result.password) {
                    var token = jwt.sign({
                        u_id: result._id,
                        u_first: result.emailId,
                        u_last: "",
                    }, 'secret', {
                        expiresIn: 60 * 60
                    });
                    res.header("AuthorizationKey", token).status(OK).send("Login Successful");
                }
                else {
                    res.status(OK).send("Invalid Credentials");
                }
                return client.close();
            })
        });
    }
});

//admin login API using bcrypt
/* app.post('/v1/admin/login', function (req, res) {
    if (typeof req.body.email === "undefined" || typeof req.body.password === "undefined") {
        res.status(BAD_REQUEST).send("Bad request Check request Body");
    } else {
        client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.connect().then(() => {
            var myObj = {
                emailId: req.body.email,
            };
            client.db('Scoping').collection('Admin').findOne(myObj, function (err, result) {
                //console.log(result._id);
                if (err)
                    res.status(INTERNAL_SERVER_ERROR).send(err);
                else if (result == null)
                    res.status(OK).send("No such user found");
                else if (result != null && bcrypt.compareSync(req.body.password, result.password)) {
                    var token = jwt.sign({
                        u_id: result._id,
                    }, 'secret', {
                        expiresIn: 60 * 60
                    });
                    res.header("AuthorizationKey", token).status(OK).send("Login Successful");
                }
                else {
                    res.status(OK).send("Invalid Credentials");
                }
                return client.close();
            })
        });
    }
}); */

// login no nycrpyt
app.post('/v1/examiner/login', function (req, res) {
    if (typeof req.body.email === "undefined" || typeof req.body.password === "undefined") {
        res.status(BAD_REQUEST).send("Bad request Check request Body");
    } else {
        client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.connect().then(() => {
            var myObj = {
                email: req.body.email,
            };
            client.db('Scoping').collection('Examiner').findOne(myObj, function (err, result) {
                console.log(result + "result");
                if (err)
                    res.status(INTERNAL_SERVER_ERROR).send(err);
                else if (result == null)
                    res.status(OK).send("No such user found");
                else if (result != null && req.body.password === result.password) {
                    var token = jwt.sign({
                        u_id: result._id,
                        u_first: result.firstname,
                        u_last: result.lastname,
                    }, 'secret', {
                        expiresIn: 60 * 60
                    });
                    res.header("AuthorizationKey", token).status(OK).send("Login Successful");
                }
                else {
                    res.status(OK).send("Invalid Credentials");
                }
                return client.close();
            })
        });
    }
});

// login bycrypt
/*
app.post('/v1/examiner/login', function (req, res) {
    if (typeof req.body.email === "undefined" || typeof req.body.password === "undefined") {
        res.status(BAD_REQUEST).send("Bad request Check request Body");
    } else {
        client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.connect().then(() => {
            var myObj = {
                email: req.body.email,
            };
            client.db('Scoping').collection('Examiner').findOne(myObj, function (err, result) {
                //console.log(result._id);
                if (err)
                    res.status(INTERNAL_SERVER_ERROR).send(err);
                else if (result == null)
                    res.status(OK).send("No such user found");
                else if (result != null && bcrypt.compareSync(req.body.password, result.password)) {
                    var token = jwt.sign({
                        u_id: result._id,
                        u_first: result.firstname,
                        u_last: result.lastname,
                    }, 'secret', {
                        expiresIn: 60 * 60
                    });
                    res.header("AuthorizationKey", token).status(OK).send("Login Successful");
                }
                else {
                    res.status(OK).send("Invalid Credentials");
                }
                return client.close();
            })
        });
    }
});
*/


// QR login
app.post('/v1/examiner/login/qr', authMiddleware, function (req, res) {
    var o_id = new ObjectId(req.encode);
    client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    client.connect().then(() => {
        var myObj = {
            _id: o_id,
        };
        client.db('Scoping').collection('Examiner').findOne(myObj, function (err, result) {
            if (err)
                res.status(INTERNAL_SERVER_ERROR).send(err);
            else if (result == null)
                res.status(OK).send("No such user found");
            else if (result != null) {
                var token = jwt.sign({
                    u_id: result._id,
                    u_first: result.firstname,
                    u_last: result.lastname,
                }, 'secret', {
                    expiresIn: 60 * 60
                });
                res.header("AuthorizationKey", token).status(OK).send(result);
            }
            else {
                res.status(OK).send("Invalid Credentials");
            }
            return client.close();
        })
    });
});






// generate QR code for Examiner
app.post('/v1/qr/examiner', authMiddleware, function (req, res) {
    if (typeof req.body.email === "undefined") {
        res.status(BAD_REQUEST).send("Bad request Check request Body");
    } else {
        client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.connect().then(() => {
            var myObj = {
                email: req.body.email,
            };
            client.db('Scoping').collection('Examiner').findOne(myObj, function (err, result) {
                if (err)
                    res.status(INTERNAL_SERVER_ERROR).send(err);
                else if (result == null)
                    res.status(OK).send("No such user found");
                else if (result != null) {
                    var token = jwt.sign({
                        u_id: result._id,
                    }, 'secret', {
                        expiresIn: 60 * 60
                    });
                    QRCode.toString(token, {
                        type: 'terminal',
                        w: 10,
                        h: 10
                    }, function (err, url) {
                        res.header("AuthorizationKey", token).status(OK).send(url);
                        console.log(url)
                    })

                }
                else {
                    res.status(OK).send("Invalid Credentials");
                }
                return client.close();
            })
        });
    }
});




//Create Examiner With Passed Information (POST)
app.post('/v1/examiner/create', authMiddleware, (req, res) => {
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
            client.db('Scoping').collection('Examiner').insertOne(myobj, function (err, result) {
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
app.delete('/v1/examiner/delete', authMiddleware, (req, res) => {
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
app.get('/v1/examiner/get-all', authMiddleware, function (req, res) {
    console.log("get-all: " + req.encode);
    client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    client.connect().then(() => {
        client.db('Scoping').collection('Examiner').find({}).toArray(function (err, result) {
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

//Retrive single Examiners Information (GET)
app.get('/v1/examiner', authMiddleware, function (req, res) {
    var o_id = new ObjectId(req.encode);
    client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    client.connect().then(() => {
        client.db('Scoping').collection('Examiner').find({ _id: o_id }).toArray(function (err, result) {
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


// Create teams
app.post('/v1/teams', authMiddleware, function (req, res) {
    // console.log("create teams: " + req.encode);
    client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    client.connect().then(() => {
        var myobj = {
            name: req.body.teamname,
            scores: []
        };
        client.db('Scoping').collection('Team').insertOne(myobj, function (err, result) {
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

// get teams
app.get('/v1/teams', authMiddleware, function (req, res) {
    client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    client.connect().then(() => {
        client.db('Scoping').collection('Team').find({}).toArray(function (err, result) {
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

// QR team
app.get('/v1/teams/qr', authMiddleware, authTeams, function (req, res) {
    var o_id = new ObjectId(req.encode_teamId);
    client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    client.connect().then(() => {
        var myObj = {
            _id: o_id,
        };
        client.db('Scoping').collection('Team').findOne(myObj, function (err, result) {
            if (err)
                res.status(INTERNAL_SERVER_ERROR).send(err);
            else if (result == null)
                res.status(NOT_FOUND).send("No such team found");
            else if (result != null) {
                res.status(OK).send(req.encode_teamId);
            }
            else {
                res.status(OK).send("Invalid Credentials");
            }
            return client.close();
        })
    });
});

// Add/Update examiner score for a team
app.post('/v1/teams/update/scores', authMiddleware, function (req, res) {
    let date = new Date()

    if (typeof req.body.teamname === "undefined" || typeof req.body.score === "undefined") {
        res.status(BAD_REQUEST).send("Bad request Check parameters or Body");
    } else {
        var o_id = new ObjectId(req.body.teamname);
        //console.log("update score: " + req.encode + " | " + req.encode_first + " " + req.encode_last);
        client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        client.connect().then(() => {

            //Check if item is in cart already
            client.db('Scoping').collection('Team').findOne({
                _id: o_id,
                "scores.examinerName": req.encode_first + " " + req.encode_last,
            }).then(result => {
                if (result != null) {
                    //console.log(result);
                    //If Examiner has already scored this team
                    var myquery = {
                        _id: o_id,
                        "scores.examinerName": req.encode_first + " " + req.encode_last,
                    };
                    var newvalues = {
                        $set: {
                            "scores.$.examinerName": req.encode_first + " " + req.encode_last,
                            "scores.$.score": parseInt(req.body.score),
                            "scores.$.date": String(date)
                        }
                    };

                    client.db('Scoping').collection('Team').updateOne(myquery, newvalues, {
                        upsert: true
                    }, function (err, result) {
                        //console.log(result)
                        if (err) {
                            res.status(INTERNAL_SERVER_ERROR).send(err);
                        } else {
                            res.status(OK).send("Record Updated");
                        }
                        return client.close();
                    })
                } else {
                    //console.log(result);
                    //Else Examiner has not already scored this team
                    var myquery = {
                        _id: o_id,
                    };
                    var newvalues = {
                        $addToSet: {
                            scores: {
                                examinerName: req.encode_first + " " + req.encode_last,
                                score: parseInt(req.body.score),
                                date: String(date)
                            }
                        }
                    };

                    client.db('Scoping').collection('Team').updateOne(myquery, newvalues, {
                        upsert: true
                    }, function (err, result) {
                        if (err)
                            res.status(INTERNAL_SERVER_ERROR).send(err);
                        else {
                            res.status(OK).send("Record Added");
                        }
                        return client.close();
                    })
                }
            })
        });
    }
})

app.get('/v1/token/check', authMiddleware, function (req, res) {
    res.status(OK).send("Token is valid");
})

http.createServer(app).listen(port, function () {
    console.log("Listening on port " + port);
})
