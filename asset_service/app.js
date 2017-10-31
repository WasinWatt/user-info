var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http')
var axios = require('axios');

var app = express();
var server = http.createServer(app)
var MongoClient = require('mongodb').MongoClient

var promise = require('bluebird')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// app.use('/', routes(connection));
app.get('/', function (req, res) {
  const name = req.query.username
  MongoClient.connect(`mongodb://${process.env.MONGO_URL}/user`, function(err, db) {
    if (err) throw err;
    const name = req.query.username
    var userProfile = db.collection("userProfile")
    userProfile.findOne({ uname: name },function(err, result){
      if (err) {
        res.send(err)
      } else {
        console.log(result)
        res.json({profile_image: result.profile_image})
      }
    })
    db.close()
  })
});

server.listen(process.env.PORT || 3030, function() {
  console.log('Connect to port', process.env.PORT || 3030)
})

module.exports = app;
