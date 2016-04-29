var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(path.join(__dirname + '/../client')));

app.get('*', function (request, response){
  response.sendFile(path.join(__dirname + '/../client/index.html'));
});

var port = process.env.PORT || 8000;

app.listen(port);

module.exports = app;



