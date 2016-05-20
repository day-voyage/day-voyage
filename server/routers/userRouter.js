'use strict';

const userRouter = require('express').Router();
const axios = require('axios');

userRouter
  .route('/loginuser')
  .post((request, response) => {
    console.log('inside server login route');
    const reqBody = request.body;
    axios.post('http://ec2-52-39-9-146.us-west-2.compute.amazonaws.com:443/v1/access_tokens', reqBody)
    .then(data => response.send(data.data))
    .catch(error => {
      console.log(error);
      response.send(error);
    });
  });


module.exports= userRouter;
