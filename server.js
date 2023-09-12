// Importing the Express framework to create a web server.
const express = require('express');

// Importing express-session middleware to manage user sessions for authentication.
const session = require('express-session');

// Importing the express-handlebars library to use the Handlebars templating engine with Express.
const exphbs = require('express-handlebars');

const routes = require('./controllers');

const helpers = require('./utils/helpers');

// Importing the Sequelize connection configuration from the 'config' directory.
const sequelize = require('./config/connection');

// Importing 'connect-session-sequelize' to store session data in a Sequelize-based database, 
// and linking it with the express-session middleware.
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Initializing an instance of the Express application.
const app = express();

// Setting up the port number for the server to listen on. 
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers }); 
//
const path = require('path');

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(routes);
  
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  