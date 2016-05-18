# Good Times
Let 'em roll

## Team

  - [Steven Tran] (https://github.com/steventran06)
  - [Vivian Chen] (https://github.com/vichen)
  - [Tor Sinclair] (https://github.com/torsinclair)
  - [Michael Rico] (https://github.com/mrmrico)

## Table of Contents

1. [UpAndRunning](#UpAndRunning)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## GIF goes here

## Up and running
- Install dependencies
- Export environement
- Start server
- Please visit API [repo](https://github.com/sweaty-figs/sweaty-figs-db) for instructions on setting up database layer

```sh
npm install
npm start
```

> You are now running locally on [localhost:3000](http://localhost:3000/)

## Why good times?
For locals and travelers to build and share custom plans of fun things to do around town or anywhere you go.

On a budget? GoodTimes can help tailor your plans to meet a budget of any size.


## Requirements

- React
- Redux
- Node 0.10.x
- Webpack 1.11.0

Please see out this [repo](https://github.com/sweaty-figs/sweaty-figs-db) for information about the requirments for setting up the API to interface with Postrgres database.

## Application Architecture

Diagram of architecture goes here

## Unstacking the stack

Good Times is a Single Page Application built with React with Redux, with client side routing through React Router

###### React
- Views are created using modular and reusable view components built in React/JSX.
- React components implement one-way reactive data flow to immediately rerender views upon changes.

###### React Router
- Good Times uses the React Router library for dynamic route matching to keep our UI in sync with the URL.
- URL paths are synced seamlessly with React view components and allows for smooth transition between page routes.

###### Redux 
- Unidirectional data-flow normalizes data and provides predictability 
- Manages states and acts as a single source of truth for props shared by components throughout the app
- Utilized in conjunction with local states to preserve modularity
- States implemented:
  - activities - results from Yelp api call
  - auth - stores web token and user information
  - dashboard - stores plans that the user has created
  - data - loading information and miscellaneous items (i.e. budget)
  - dbactivities - results from database api call
  - directions - stores map coordinates of activities
  - planBuilder - temporary list of activities that the user is creating before saving the the database
  - router - keeps track of react router history and location change

###### Node
- Good Times utilizes Node.js for its extensive package ecosystem through npm, including React and other libraries.

###### Express
- Good Times is served using Express, which helps with server-side routing and handles API calls to the database and external APIs.
- Utilizes middleware such as body-parser for requests and webpack-dev-middleware to serve our Webpack assets.

###### Webpack


## API's
The data powering our application.

[sweaty-figs-db](https://github.com/sweaty-figs/sweaty-figs-db)
- Built with Nodal and Postgres
- see repo for endpoints

###### External API - Yelp
- Good Times utilizes the Yelp Search API to supplement user-generated activities with local establishments based on your search query in the city of your choosing.

###### External API - Google Maps
- Google Maps - Implemented using the React-Google-Maps library. Good Times generates all search points on the map and creates routes between activities in a plan based on the order of activities set.
- Google Geocoding - When geolocation search is activated, Google Geocoding is used to translate the coordinates from latitude/longitude to a city name, so it can be implemented as a location query for our database and the Yelp Search API.
- Google Distance Matrix - When doing search based on geolocation, all activities include the distance from the user's location in miles.


## Challenges
- routing

## Development

To build webpack and generate a bundle:
From within the root directory:
```sh
npm start
```

## Deployment
To generate docs:
```sh
npm start doc
```
Refer to http://en.blog.koba04.com/2015/06/28/esdoc-documentation-for-react-and-es6/ for how to
document


### Roadmap

View the project roadmap [here](LINK_TO_PROJECT_ISSUES)


## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.
