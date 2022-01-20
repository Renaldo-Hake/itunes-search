// SERVER

// Requirements
const express = require('express');
const helmet = require("helmet");
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');

// initialize express
const app = express();

// secure app
app.use(helmet());

// connect to mongoDB
const uri = 'mongodb+srv://admin:Password@hyperion-task.cwxa2.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

// middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
//app.use(express.json());
//app.use(cors);
app.use(morgan('dev'));

// Using routes
app.use('/', routes);

// LIstening on Port
const PORT = 8000;
app.listen(PORT, () => console.log("Listening on port:", PORT));

module.exports = app;