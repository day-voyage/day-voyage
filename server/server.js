var express = require('express');
var path = require('path');
// var bodyParser = require('body-parser');
var Yelp = require('yelp');
var yelpAPIKey = require('./config/yelp.js');
var fs = require('fs');

var app = express();

app.use(express.static(path.join(__dirname + '/../client')));

// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());

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
  var body = '';
  request.on('data', chunk => body += chunk)
          .on('end', () => console.log(body));
  yelp.search({ term: 'food', location: 'San Francisco, CA' })
  .then(function (data) {
    response.send(data.businesses);
    // response.send(request.params);
  })
  .catch(function (err) {
    console.error(err);
  });
});

var port = process.env.PORT || 8000;

app.listen(port);

module.exports = app;




// See http://www.yelp.com/developers/documentation/v2/search_api