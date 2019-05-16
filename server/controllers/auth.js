//auth/controller

const LocalStrategy = require('passport-local');
const passport = require('passport');
const User = require('../models/user');



/* Get Registration form for  User*/
exports.getRegistrationForm = function (req, res) {
    res.render('register');
};

//Post regisgter 
exports.postRegistrationForm = function (req, res, next) {
    console.log("posting " + req.param('email'));
    User.findOne({
        'email': req.param('email')
    }, (err, user) => {
        if (err) {
            return res.send("Error!");
        }
        console.log(user);
        if (user) {
            console.log("Found user - should not continue");
            return res.send("User Exists");
        }
        const data = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email
        }
        var user = new User();
        user.set(data);
        user.setPassword(req.body.password);
        user.save().then(() => {
            if (err) {
                return next(err);
            }
            req.session.user = user;
            console.log("Created user, redirecting to user page");
            res.redirect('login');
        }).catch(err => {
            console.log(err);
        });
    });
};

/* GET login page. */
exports.getLoginForm = function (req, res, next) {
    res.render('login', {
        path: '/auth/login'
    });
};


module.exports.postLoginForm = function (req, res, next) {
    //console.log("Auth.config", path.join(__dirname, 'strategies', 'local-strategy'))
    passport.authenticate('local', function (err, user, info) {
        if (err || !user) {
            console.log("Error", info);
            return res.status(400).send(info);
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
        })
        res.redirect('/rental/equipment');
        //res.status(200).json(user);
    })(req, res, next);
}


/* GET user home page.*/
exports.getUserDashboard = function (req, res) {
    const user = req.session.user;

    if (user && user.isAdmin === true) {
        //console.log(res.session.user);
        res.render('admin/dashboard', {
            // user: user,
            path: '/admin/dashboard'
        })
    } else {
        res.render('rentals/userDashboard', {
            // user: user,
            path: '/rental/userDashboard'
        });
    }
};


/* post router for log-out. */
exports.getLogout = function (req, res) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                //return res.redirect('/');
                return res.redirect('/');
            }
        });

    }
};