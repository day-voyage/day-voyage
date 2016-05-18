'use strict';

const dbrouter = require('express').Router();
const axios = require('axios');

dbrouter
  .route('/createplan')
  .post(function (request, response) {
    console.log('inside post to db plan');
    let plan = request.body.plan;
    let access_token = request.body.access_token;
    let activities = request.body.activities;
    let reqBody = Object.assign(plan, {
      activities: activities
    });
    axios.post(`https://sweatyfigs.api.poly.cloud/v1/plans?access_token=${access_token}`, reqBody)
      .then(data => {
        response.send(data.data);
    })
      .catch(error => {
        console.log('Error posting plans to db from server:', error);
        response.send(error);
      });
  });

dbrouter
  .route('/updateplan')
  .post(function (request, response) {
    console.log('<><> inside post to update db <>');
    let plan = request.body.plan;
    let plan_id = request.body.plan_id;
    let access_token = request.body.access_token;
    let activities = request.body.activities;
    let reqBody = Object.assign(plan, {
      activities: activities
    });
    axios.put(`https://sweatyfigs.api.poly.cloud/v1/plans/${plan_id}?access_token=${access_token}`, reqBody)
    .then(data => response.send(data.data))
    .catch(error => {
      console.log(error);
      response.send(error);
    });
  });

module.exports = dbrouter;
