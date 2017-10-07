// load all the things we need
let LocalStrategy    = require('passport-local').Strategy;

// load up the user model
let User       = require('../server/models/user');


module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        console.log(req.body);
        console.log("email "+ email);
        console.log("password >>"+ password);
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err){
                    return done(err);

                } else if(!user.validPassword(password)){
                    return done(null, false);
                } else {
                    console.log("user is valid");
                    return done(null, user);
                }

            });
        });

    }));


    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        nameField: 'name',
        phoneField : 'phone',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, name, phone, done) {

        console.log("i am here ");
        // console.log(email);
        // console.log(password);
        //
        // console.log(phone);
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({ 'email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                        return done(null, false);
                    } else {

                        // create the user
                        var newUser  = new User();

                        newUser.email    = email;
                        newUser.password = newUser.generateHash(password);
                        newUser.phone = req.body.phone;
                        newUser.name = req.body.name;

                        newUser.save(function(err, user) {
                            if (err){
                                console.log(err);
                            }else{
                                return done(null, user);
                            }


                        });
                    }

                });

            // if the user is logged in but has no local account...
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, false);
            }

        });

    }));

};
