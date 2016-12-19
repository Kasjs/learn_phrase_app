'use scrict'
const User = require('mongoose').model('User');
const Category = require('mongoose').model('Category');
const passportLocalStrategy = require('passport-local').Strategy;


module.exports = function(config) {

    return new passportLocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        session: false,
        passReqToCallback: true
        }, function(req, email, password, done) {
        let userData = {
            email: email.trim(),
            password: password.trim(),
            category: new Category()
        };

        let newUser = new User(userData);
        newUser.save(function(err) {
            if (err) { return done(err); }
            return done(null);
        });
    });
};
