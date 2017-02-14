'use scrict'

const mongoose = require('mongoose'),
bcrypt = require('bcryptjs'),
User = mongoose.model('User'),
Category = mongoose.model('Category');

// callbaks for routes
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

    User.findOne({ email: req.body.email }, function(err, user) {
        if ( user.category[0][req.body.name] ) {
            updateExistingCategory(req, res, user);
        } else {
            createNewCategory(req, res, user);
        }
    });
};

module.exports.changeName = function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
        user.defaultCategory.map((item) => {
            if (item.label === req.body.oldName) {
                item.label = item.value = req.body.newName;
            }
        });
        delete user.category[0][req.body.oldName];
        user.category[0][req.body.newName] = [];
        user.category[0][req.body.newName] = req.body.categoryField;
        user.markModified('category');
        user.markModified('defaultCategory');
        user.save(function(err) {
            if (err) {
                res.send({
                    msg: 'Can\'t change name'
                });
            }
            res.send({
                msg: 'Name has changed'
            });
        });
    });
}

// category computation functions
function updateExistingCategory(req, res, user) {

    var same = false;
    user.category[0][req.body.name].forEach(function(item) {
        if (item.side_b === req.body.content.side_b) {
            same = true;
        }
    });
    if (same) {
        checkIfSameItem(req, res, user);
    } else {
        addNewItem(req, res, user);
    }
}

function createNewCategory(req, res, user) {

    user.category[0][req.body.name] = [];
    user.markModified('category');
    user.category[0][req.body.name].push(req.body.content);
    user.markModified(req.body.name);
    updateArrayOfCategories(req, res, user);
}

//adding new category to existing array of categories
function updateArrayOfCategories(req, res, user) {

    let newCategoryOption = {
        value : req.body.name,
        label: req.body.name
    };
    var allCategory = user.defaultCategory;
    allCategory.map((item, index) => {
        if (item.value === newCategoryOption.value) {
            allCategory.splice(index, 1);
            isDublicate = true;
        }
    });
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

// Item computation functions
function checkIfSameItem(req, res, user) {

    return res.send({
        data: user.category[0],
        categoryNames : user.defaultCategory
    });
}

function addNewItem(req, res, user) {

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
