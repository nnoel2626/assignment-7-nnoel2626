//auth.js
const express = require('express');
const authRouter = express.Router();
var app = express();
const authController = require('../controllers/auth');
const User = require('../models/user');
const auth = require('../routes/auth');
require('../controllers/passport');
const passport = require('passport');



/* authController@getRegistrationFormt*/
authRouter.get('/register', authController.getRegistrationForm);

/* authController@postRegistrationFormt*/
authRouter.post('/register', authController.postRegistrationForm);

/* authController@getLoginFormt*/
authRouter.get('/login', authController.getLoginForm);

/* authController@postLoginFormt*/
authRouter.post('/login', authController.postLoginForm);

/* get user dashboard*/
authRouter.get('/userDashboard', authController.getUserDashboard);


/* authController@postlogout*/
authRouter.get('/logout', authController.getLogout);


module.exports = authRouter;