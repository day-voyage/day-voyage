var express = require('express');
var path = require('path');
var YELP_API_KEY = require('./config/yelp.js');

var app = express();

app.use(express.static(path.join(__dirname + '/../client')));
app.use('/node_modules', express.static(path.join(__dirname + '/../node_modules')));

app.get('*', function (request, response){
  response.sendFile(path.join(__dirname + '/../client/index.html'));
});

var port = process.env.PORT || 8000;

app.listen(port);

module.exports = app;

var Yelp = require('yelp');


var yelp = new Yelp({
  consumer_key: YELP_API_KEY.key,
  consumer_secret: YELP_API_KEY.keySecret,
  token: YELP_API_KEY.token,
  token_secret: YELP_API_KEY.tokenSecret
});

// See http://www.yelp.com/developers/documentation/v2/search_api
yelp.search({ term: 'food', location: 'San Francisco, CA' })
.then(function (data) {
  console.log(data);
})
.catch(function (err) {
  console.error(err);
});