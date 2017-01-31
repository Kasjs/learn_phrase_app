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
        if ( req.body.categoryData === undefined ) {
            user.category[0] = {};
            user.markModified('category');
            user.defaultCategory = [];
            user.markModified('defaultCategory');
            user.save();
            return res.send({
                data: user.category[0]
            })
        }
        console.log('sync all category', req.body.categoryData);
        user.category[0] = req.body.categoryData;
        user.markModified('category');
        user.defaultCategory = req.body.categoryNames;
        user.markModified('defaultCategory');
        user.save();
        return res.send({
            data: user.category[0]
        })
    });
}

module.exports.addNewCategory = function(req, res) {
    var same = false;
    User.findOne({ email: req.body.email }, function(err, user) {
        if ( user.category[0][req.body.name] ) {
            console.log('existing category part', user.category[0]);
            user.category[0][req.body.name].forEach(function(item) {
                if (item.side_b === req.body.content.side_b) {
                    same = true;
                }
            });
            if (same) {
                return res.send({
                    data: user.category[0],
                    categoryNames : user.defaultCategory
                });
            } else {
                user.category[0][req.body.name].push(req.body.content);
                user.markModified('category');
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
        } else {
            user.category[0][req.body.name] = [];
            user.markModified('category');
            user.category[0][req.body.name].push(req.body.content);
            user.markModified(req.body.name);
            let newCategoryOption = {
                value : req.body.name,
                label: req.body.name
            };
            // var isDublicate = false;
            var allCategory = user.defaultCategory;
            allCategory.map((item, index) => {
                if (item.value === newCategoryOption.value) {
                    allCategory.splice(index, 1);
                    isDublicate = true;
                }
            });
            // if (isDublicate) {
            //     console.log('is dublicate = true', user.defaultCategory)
            //     user.defaultCategory.pop();
            //     // user.defaultCategory = allCategory;
            // }
            user.defaultCategory.push(newCategoryOption);
            user.markModified('defaultCategory');
            user.save(function(err, result) {
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
