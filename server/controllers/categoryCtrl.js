const mongoose = require('mongoose'),
bcrypt = require('bcryptjs'),
User = mongoose.model('User'),
Category = mongoose.model('Category');

module.exports.getCategory = function(req, res) {
    User.findOne({email : req.query.email}, function(err, user) {
        if (user) {
            res.send({
                data : user.category[0]
            });
        } else {
            res.status(400).json({
                msg: 'Error not found category'
            });
        }
    });
};

module.exports.postCategory = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        user.category[0][req.body.category] = req.body.data;
        user.markModified('category');
        user.save();
        return res.send({
            data: user.category[0]
        });
    });
};
