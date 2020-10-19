const express = require('express');
const http = require('http');
const port = process.env.PORT || 5000;
const app = express();

//API code goes here

http.createServer(app).listen(port, function (){
    console.log("Listening on port " + port);
})