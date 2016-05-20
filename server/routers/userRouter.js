'use strict';

const userRouter = require('express').Router();
const axios = require('axios');

userRouter
  .route('/login')
  .post((request, response) => {
    console.log('inside server login route');
    const reqBody = request.body;
    axios.post('http://localhost:8080/v1/access_tokens', reqBody)
    .then(data => response.send(data.data))
    .catch(error => {
      console.log(error);
      response.send(error);
    });
  });

userRouter
  .route('/signup')
  .post((request, response) => {
    console.log('inside server signup route');
    const reqBody = request.body;
    axios.post(`http://localhost:8080/v1/users`, reqBody)
      .then(data => response.send(data.data))
      .catch(error => {
        console.log(error);
        response.send(error);
      });
  });


module.exports = userRouter;
