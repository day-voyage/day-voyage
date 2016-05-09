'use strict';

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const config = require('../webpack.config');
const compiler = webpack(config);

var path = require('path');
var Yelp = require('yelp');
var yelpAPIKey = require('./config/yelp.js');

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));
app.use(bodyParser.json());

// var app = require('./routes.js');

app.use(express.static(path.join(__dirname + '../src')));
app.use(bodyParser.urlencoded({ extended: false }));

//TODO: is this necessary
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
  response.sendFile(path.join(__dirname + '/../src/index.html'));
});


const port = process.env.PORT || 3000;

app.listen(port);

module.exports = app;
