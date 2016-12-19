'use scrict'
const mongoose = require('mongoose'),
bcrypt = require('bcryptjs'),
User = mongoose.model('User'),
Category = mongoose.model('Category');

module.exports.getCategory = function(req, res) {
    User.findOne({email : req.query.email}, function(err, user) {
        if (user) {
            res.send({
                data : user.category[0],
                categoryNames: user.defaultCategory
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

module.exports.syncAllCategory = function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        user.category[0] = req.body.categoryData;
        user.markModified('category');
        user.defaultCategory = req.body.categoryNames;
        user.markModified('defaultCategory');
        user.save();
        console.log(user.category[0]);
        return res.send({
            data: user.category[0]
        })
    });
}

module.exports.addNewCategory = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        if ( user.category[0][req.body.name] ) {
            user.category[0][req.body.name].push(req.body.content);
            user.markModified('category');
            console.log(user.category[0][req.body.name]);
            user.save(function(err,result) {
                if (err) {
                    res.status(400).json({
                        msg: 'Can\'t save data'
                    });
                }
            });
            console.log(user.category[0][req.body.name]);
            return res.send({
                data: user.category[0],
                categoryNames : user.defaultCategory
            });
        } else {
            user.category[0][req.body.name] = [];
            user.markModified('category');
            user.category[0][req.body.name].push(req.body.content);
            user.markModified(req.body.name);
            let newCategoryOption = {
                value : req.body.name,
                label: req.body.name

            };
            user.defaultCategory.push(newCategoryOption);
            user.markModified('defaultCategory');
            user.save(function(err,result) {
                if (err) {
                    res.status(400).json({
                        msg: 'Can\'t save data'
                    });
                }
            });
            return res.send({
                data: user.category[0],
                categoryNames : user.defaultCategory
            });
        }
    });
};
