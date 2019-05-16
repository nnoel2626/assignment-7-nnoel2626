//App.js

//load environment variable
require('dotenv').config();

// grab our dependencies
const path = require('path');
const express = require('express');
const bodyparser = require('body-parser');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
//require('./controllers/passport');
const passport = require('passport');


mongoose.Promise = global.Promise;
//Database connetion
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PWD}@rentalshop-shard-00-00-t8ria.mongodb.net:27017,rentalshop-shard-00-01-t8ria.mongodb.net:27017,rentalshop-shard-00-02-t8ria.mongodb.net:27017/rentalShop?ssl=true&replicaSet=rentalShop-shard-0&authSource=admin&retryWrites=true`, {
  useNewUrlParser: true
}).catch((err) => {
  console.error(`database connection error: ${err}`);
  process.exit();
});



//Routes modules

const auth = require('./routes/auth');
const apiAdmin = require('./routes/api.admin');
const apiRentalShop = require('./routes/api.rentalShop');


var cors = require('cors')



//initial express
var app = express();
app.use(cors());

app.use(cookieParser('rentalShop-secret'));
app.use(session({
  secret: "rentalShop",
  resave: "true",
  saveUninitialized: "true"
}));

app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(bodyparser.json());

app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


// view engine setup 
app.set('views', path.join(__dirname, 'views')),
  app.set('view engine', 'pug');
app.set('view options', {
  layout: true,
  include: true
});

app.use(express.static(path.join(__dirname, 'public')));
var jsonParser = bodyparser.json();


//Route Middleware
app.use('/', express.static('../client/dist'));
app.use('/auth', auth);
//API routes
app.use('/api/admin', jsonParser, apiAdmin);
app.use('/api/rentalshop', jsonParser, apiRentalShop);
//Client route


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).redirect('/404.html');
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;