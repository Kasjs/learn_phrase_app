const mongoose = require('mongoose');
var userShema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }
    password: {
        type: String,
        selected: false
    }
    CategoryDictionary: [
        {   category: String,
            feeds: [{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Category'
			}]
        }
    ]
});
