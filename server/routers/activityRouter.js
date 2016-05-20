'use strict';

const activityRouter = require('express').Router();
const axios = require('axios');

activityRouter
  .route('/searchActivities')
  .post((request, response) => {
    const city = request.body.city;

    axios.get(`http://localhost:8080/v1/activities?city__icontains=${city}&private__is=false&isYelp__is=false`)
      .then(data => response.send(data.data))
      .catch(error => {
        console.log(error);
        response.send(error);
      });
  });

activityRouter
  .route('/saveactivity')
  .post((request, response) => {
    // console.log('inside server route for activity save>>>>>>>>>>>>>>>>');

    const access_token = request.body.access_token;
    const reqBody = request.body.activity;

    // console.log('>>>>>>>>>>>>>>>>>>>', request.body.activity);

    delete request.body.activity.icon;
    delete request.body.activity.clientside_id;
    delete request.body.activity.index;
    request.body.activity.categories = JSON.stringify([].concat(request.body.activity.categories));
    // request.body.activity.categories;
    delete request.body.activity.neighborhood;

    // console.log('AFTER>>>>>>>>>>>>>>>>>>>', request.body.activity);

    axios.post(`http://localhost:8080/v1/activities?access_token=${access_token}`, reqBody)
      .then(data => response.send(data.data))
      .catch(error => {
        console.log(error);
        response.send(error);
      });
  });

module.exports = activityRouter;
