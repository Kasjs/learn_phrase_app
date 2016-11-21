const mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        selected: false
    },
    category: {
		type: Array
	}


});

module.exports = mongoose.model('User', userSchema);
