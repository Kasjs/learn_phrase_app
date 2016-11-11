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
    CategoryDictionary: [
        {   category: String,
            categories: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Category'
			}]
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
