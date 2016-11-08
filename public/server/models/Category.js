var mongoose = require('mongoose'),
categorySchema = new mongoose.Schema({
    Food: {
        type: Array
    },
    Sport: {
        type: Array
    },
    Nature: {
        type: Array
    }
});
module.export = categorySchema;
