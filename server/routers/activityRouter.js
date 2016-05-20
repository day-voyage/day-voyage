'use strict';

const activityRouter = require('express').Router();
const axios = require('axios');

activityRouter
  .route('/searchActivities')
  .post((request, response) => {
    const city = request.body.city;

    axios.get(`http://ec2-52-39-9-146.us-west-2.compute.amazonaws.com:443/v1/activities?city__icontains=${city}&private__is=false&isYelp__is=false`)
      .then(data => response.send(data.data))
      .catch(error => {
        console.log(error);
        response.send(error);
      });
  });

module.exports = activityRouter;
