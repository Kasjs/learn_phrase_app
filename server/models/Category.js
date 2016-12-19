'use scrict'
var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
    Food: {
        type: Array,
        nested: {
            side_a : {
                type: String,
                unique: true
            }
        },
        default: [
            {
                "side_a": "яблуко",
                "side_b": "apple",
                "hits": 0
            },
            {
                "side_a": "апельсин",
                "side_b": "orange",
                "hits": 0
            },
            {
                "side_a": "хліб",
                "side_b": "bread",
                "hits": 0
            },
            {
                "side_a": "молоко",
                "side_b": "milk",
                "hits": 0
            },
            {
                "side_a": "вода",
                "side_b": "water",
                "hits": 0
            },
            {
                "side_a": "сік",
                "side_b": "juice",
                "hits": 0
            },
            {
                "side_a": "тістечко",
                "side_b": "cake",
                "hits": 0
            }
        ]
    },
    Sport: {
        type: Array,
        default: [
            {
                "side_a": "бігти",
                "side_b": "run",
                "hits": 0
            },
            {
                "side_a": "ходити",
                "side_b": "walk",
                "hits": 0
            },
            {
                "side_a": "м'яч",
                "side_b": "ball",
                "hits": 0
            },
            {
                "side_a": "лук",
                "side_b": "bow",
                "hits": 0
            },
            {
                "side_a": "стріла",
                "side_b": "arrow",
                "hits": 0
            },
            {
                "side_a": "стрибати",
                "side_b": "jump",
                "hits": 0
            },
            {
                "side_a": "плавати",
                "side_b": "sweam",
                "hits": 0
            },
            {
                "side_a": "футбол",
                "side_b": "football",
                "hits": 0
            },
            {
                "side_a": "гольф",
                "side_b": "golf",
                "hits": 0
            }
        ]
    },
    Nature: {
        type: Array,
        default: [
            {
                "side_a": "небо",
                "side_b": "sky",
                "hits": 0
            },
            {
                "side_a": "місяць",
                "side_b": "moon",
                "hits": 0
            },
            {
                "side_a": "земля",
                "side_b": "earth",
                "hits": 0
            },
            {
                "side_a": "ліс",
                "side_b": "forest",
                "hits": 0
            },
            {
                "side_a": "океан",
                "side_b": "ocean",
                "hits": 0
            },
            {
                "side_a": "річка",
                "side_b": "river",
                "hits": 0
            },
            {
                "side_a": "листок",
                "side_b": "leaf",
                "hits": 0
            },
            {
                "side_a": "зима",
                "side_b": "winter",
                "hits": 0
            },
            {
                "side_a": "осінь",
                "side_b": "spring",
                "hits": 0
            },
            {
                "side_a": "лід",
                "side_b": "ice",
                "hits": 0
            },
            {
                "side_a": "жара",
                "side_b": "hot",
                "hits": 0
            }
        ]
    }
});
module.exports = mongoose.model('Category', categorySchema);
