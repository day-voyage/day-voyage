var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Yelp = require('yelp');
var yelpAPIKey = require('./config/yelp.js');

var app = express();

// var app = require('./routes.js');

app.use(express.static(path.join(__dirname + '/../client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/node_modules', express.static(path.join(__dirname + '/../node_modules')));


// Yelp stuff
var yelp = new Yelp({
  consumer_key: yelpAPIKey.key,
  consumer_secret: yelpAPIKey.keySecret,
  token: yelpAPIKey.token,
  token_secret: yelpAPIKey.tokenSecret
});

app.get('/api/yelpSearch', function(request, response) {
  console.log(request.query);
  yelp.search({ term: request.query.category, location: request.query.city, limit: 10, sort: 2 })
  .then(function (data) {
    response.send(data.businesses);
  })
  .catch(function (err) {
    console.error(err);
  });
});


app.get('*', function (request, response){
  response.sendFile(path.join(__dirname + '/../client/index.html'));
});


var port = process.env.PORT || 8000;

app.listen(port);

module.exports = app;