# Day Voyage
where will you're day take you?

## Team

  - [Steven Tran] (https://github.com/steventran06)
  - [Vivian Chen] (https://github.com/vichen)
  - [Tor Sinclair] (https://github.com/torsinclair)
  - [Michael Rico] (https://github.com/mrmrico)

## Table of Contents

1. [Up and Running](#up-and-running)
1. [Why Day Voyage][#why-day-voyage]
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)
1. [Unstacking the Stack](#unstacking-the-stack)

## GIF goes here

## Up and running
- Install dependencies
- Export environment
- Start server
- Please visit API [repo](https://github.com/sweaty-figs/sweaty-figs-db) for instructions on setting up api for data layer.

```sh
npm install
npm start
```

> You are now running locally on [localhost:3000](http://localhost:3000/)

## Why Day Voyage

For locals and travelers to build and share custom plans of fun things to do around town or anywhere you go.

On a budget? Day Voyage help tailor your plans to meet a budget of any size.

## Requirements

- React
- Redux
- Node 0.10.x // TODO: what version?
- Webpack 1.11.0
- Postgres 9.5.2.0
- Nodal 0.1.0

Please see this [repo](https://github.com/sweaty-figs/sweaty-figs-db) for information about requirments and set up for the API driving our data layer.

## Application Architecture

Diagram of architecture goes here

## Unstacking the stack

Day Voyage is a Single Page Application built with:
- React (drives user driven client side interface)
- Redux (application state management)
- React Router and Redux Router (client side routing)

###### React
- Views are created using modular and reusable components built in React/JSX.
- React components implement one-way reactive data flow to immediately rerender views upon changes.

###### React Router
- Day Voyage uses the React Router library for dynamic route matching to keep our UI in sync with the URL.
- URL paths are synced seamlessly with React view components and allows for smooth transition between page routes.

###### Redux
- Unidirectional data-flow normalizes data and provides predictability
- Manages states and acts as a single source of truth for data shared by components throughout the application
- Utilized in conjunction with local states to preserve modularity
- Snapshot of application state tree:
  - **activities:** results from Yelp API call
  - **auth:** stores web tokens and user information
  - **dashboard:** stores user created plans (itineraries)
  - **data:** loading information and miscellaneous items (i.e. budget)
  - **dbactivities:** results from database api call for activities
  - **directions:** stores map coordinates of activities
  - **planBuilder:** temporary list of activities that the user is creating before sa**ving the** the database
  - **router:** keeps track of react router history and location change

###### Node
- Good Times utilizes Node.js for its extensive package ecosystem through npm, including React and other libraries.

###### Express
- Good Times is served using Express, which provides server-side routing and an enviornment for executing API calls to the database and external APIs.
- Utilizes middleware such as body-parser for requests and webpack-dev-middleware to serve our Webpack assets.

###### Webpack


## API's
The data powering our application.

###### Day Voyage API
[sweaty-figs-db](https://github.com/sweaty-figs/sweaty-figs-db)
- Built with Nodal and Postgres
- See linked repo for endpoints and schemas

**Postgress**
- Our solution for the relational nature of the data

**Nodal**
- Our server interfacing with the Postgres instance
- Separating our API from the application server decouples concerns of the cient and data

###### Yelp __External API__
- Day Voyage utilizes the **Yelp Search API** to supplement user-generated activities with local establishments based on your search query in the city of your choosing.

###### Google Maps __External API__
- **Google Maps** - Implemented using the React-Google-Maps library. Day Voyage generates all search points on the map and creates routes between activities in a plan based on the order of activities set.
- **Google Geocoding** - When geolocation search is activated, Google Geocoding is used to translate the coordinates from latitude/longitude to a city name, so it can be implemented as a location query for our database and the Yelp Search API.
- **Google Distance Matrix** - allows for searches based on geolocation. All activities in the application include the distance from the user's location in miles.


## Challenges
Our team sailed through on calm seas!

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
