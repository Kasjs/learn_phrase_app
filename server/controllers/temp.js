module.exports.addNewCategory = function(req, res) {
    var same = false;
    User.findOne({ email: req.body.email }, function(err, user) {
        if ( user.category[0][req.body.name] ) {
            updateExistingCategory(req, res, user)
        } else {
            createNewCategory(req, res, user);
        }
    });
};

function updateExistingCategory(req, res, user) {
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
}

function createNewCategory(req, res, user) {

    user.category[0][req.body.name] = [];
    user.markModified('category');
    user.category[0][req.body.name].push(req.body.content);
    user.markModified(req.body.name);
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
