'use strict';

const commentRouter = require('express').Router();
const axios = require('axios');

commentRouter
  .route('/create')
  .post((request, response) => {
    axios.post(`http://localhost:8080/v1/comments`, request.body)
      .then(data => response.send(data.data))
      .catch(error => {
        console.log(error);
        response.send(error);
      });
  });

module.exports = commentRouter;
