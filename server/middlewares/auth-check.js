'use scrict'
const jwt = require('jsonwebtoken');
const User = require('mongoose').model('User');

module.exports = function(config) {

    return function(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).end();
        }

        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, config.jwtSecret, function(err, decoded) {

            if (err) { return res.status(401).end(); }
            let userId = decoded.sub;

            User.findById(userId, function(err, user) {
                if (err || !user) {
                    return res.status(401).end();
                }
            return next();
            });
        });
    };
};
