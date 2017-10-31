var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http')
let axios = require('axios');

var app = express();
var server = http.createServer(app)
var mysql = require('mysql')

var promise = require('bluebird')
axios = promise.promisifyAll(axios)

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

var connection = mysql.createConnection({
  host: "user_data",
  user: "user_data",
  password: "notesource",
  database: "ABCompany",
  port: 3306
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected! to mysql");
});

// app.use('/', routes(connection));
app.get('/', async function (req, res) {
  const name = req.query.username
  connection.query(`SELECT phone_number FROM user_profile U WHERE U.username = '${name}'`, (err, rows) => {
    if (err) {
      res.send(err)
    }
    fetch(`${process.env.ASSET_URL}/?username=${name}`, (err, data) => {
      const result = {}
      result.username = name
      result.phone_number = rows[0].phone_number
      result.profile_image = data.profile_image
      res.json(result)
    })
  })
  connection.end()
});

server.listen(process.env.PORT || 8080, function() {
  console.log('Connect to port', process.env.PORT || 8080)
})

module.exports = app;
