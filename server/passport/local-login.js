'use scrict'
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');
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
        password: password.trim()
    };

    User.findOne({email: userData.email}, function(err, user) {
        if (err) { return done(err); }

        if (!user) {
            let error = new Error("Incorrect email or password");
            error.name = "IncorrectCredentialsError";
            return done(error);
        }
        user.comparePassword(userData.password, function(err, isMatch) {
            if (err) { return done(err); }

            if (!isMatch) {
                let error = new Error("Incorrect email or password");
                error.name = "IncorrectCredentialsError";
                return done(error);
            }
        let payload = {
            sub: user._id,
        };
        let token = jwt.sign(payload, config.jwtSecret);
        let userData = {
            email: user.email,
            defaultCategory: user.defaultCategory
        };
        return done(null, token, userData);
      });
    });
  });
};
