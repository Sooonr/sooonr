# ReactCRUD

ReactCRUD is a basic full Javascript CRUD made with love by three french students and for the development of there main application Sooonr.

## Features

The CRUD is a management system for quotes. A quote has an author and some content.

1. List all the quotes (homepage)
2. Create a new quote (/new)
3. Show a quote (/quote/:id)
4. Edit a quote (/quote/update/:id)
5. Delete a quote (/quote/:id)

## Getting Started

Follow these instructions to have a functional version of ReactCRUD on your local.

### Requirements

* [NodeJS](https://nodejs.org/en/ "Node.js Homepage")
* [MongoDB](https://www.mongodb.com/ "MongoDB Homepage")

### Installation

First initialize the mongoDB. You only have to create a new Mongo database and add a collection named `quote`.
[This tool](https://www.mongodb.com/products/compass "MongoDB Compass") will help you a lot. Then, open a bash and launch MongoDB with the simple command `mongod`. That's it !

In a second time, launch ReactCRUD :
```
git clone https://github.com/Sooonr/ReactCRUD
cd ReactCRUD
npm run install-all
npm run start-dev
```
Then go to localhost:3000 and here you go !

The command `npm run start-dev` launch both the React project and the Express API which is linked to your MongoDB.

The production build is coming soon.

## Built With

* [ReactJS](https://reactjs.org/ "ReactJS Homepage") - Javascript library used for interface
* [ExpressJS](http://expressjs.com/fr/ "ExpressJS Homepage") - NodeJS server
* [Axios](https://github.com/axios/axios "Axios on Github") - Promise based HTTP client
* [Aphrodite](https://github.com/Khan/aphrodite "Aphrodite on Github") - CSS in JS

## Contributing

* Rudy Lantoarijaona - *Developer*
* Antoine Lucas - *Developer*
* Valentin Kajdan - *Developer*

**Join us to build the most powerful CRUD based on ReactJS !**
