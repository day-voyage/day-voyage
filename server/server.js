var express = require('express');
var path = require('path');
var Yelp = require('yelp');
var yelpAPIKey = require('./config/yelp.js');

var app = express();

app.use(express.static(path.join(__dirname + '/../client')));
app.use('/node_modules', express.static(path.join(__dirname + '/../node_modules')));

app.get('*', function (request, response){
  response.sendFile(path.join(__dirname + '/../client/index.html'));
});

var yelp = new Yelp({
  consumer_key: yelpAPIKey.key,
  consumer_secret: yelpAPIKey.keySecret,
  token: yelpAPIKey.token,
  token_secret: yelpAPIKey.tokenSecret
});

app.post('/api/yelpSearch', function(request, response) {
  yelp.search({ term: 'food', location: 'San Francisco, CA' })
  .then(function (data) {
    response.send(data.businesses);
  })
  .catch(function (err) {
    console.error(err);
  });
});

var port = process.env.PORT || 8000;

app.listen(port);

module.exports = app;




// See http://www.yelp.com/developers/documentation/v2/search_api
