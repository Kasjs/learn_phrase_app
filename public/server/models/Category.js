const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    Food: {
        type: Array,
        default: [
            {en: 'apple', uk: 'яблуко', "rating": 0}, {en: 'orange', uk: 'апельсин', "rating": 0},
            {en: 'bread', uk: 'хліб', "rating": 0}, {en: 'milk', uk: 'молоко', "rating": 0}, {en: 'water', uk: 'вода', "rating": 0},
            {en: 'juice', uk: 'сік', "rating": 0}, {en: 'cake', uk: 'тістечко', "rating": 0}
        ]
    },
    Sport: {
        type: Array,
        default: [
            {en: 'run', uk: 'бігти', "rating": 0}, {en: 'walk', uk: 'ходити', "rating": 0}, {en: 'ball', uk: 'м\'яч', "rating": 0},
            {en: 'bow', uk: 'лук', "rating": 0}, {en: 'arrow', uk: 'стріла', "rating": 0},
            {en: 'jump', uk: 'стрибати', "rating": 0}, {en: 'sweam', uk: 'плавати', "rating": 0}, {en: 'football', uk: 'футбол', "rating": 0}
        ]
    },
    Nature: {
        type: Array,
        default: [{en: 'sky', uk: 'небо', "rating": 0}, {en: 'moon', uk: 'місяць', "rating": 0}, {en: 'earth', uk: 'земля', "rating": 0},
            {en: 'forest', uk: 'ліс', "rating": 0}, {en: 'ocean', uk: 'океан', "rating": 0},
            {en: 'river', uk: 'річка', "rating": 0}, {en: 'leaf', uk: 'листок', "rating": 0}, {en: 'winter', uk: 'зима', "rating": 0},
            {en: 'spring', uk: 'осінь', "rating": 0}, {en: 'ice', uk: 'лід', "rating": 0}, {en: 'hot', uk: 'жара', "rating": 0}
        ]
    }
});
module.exports = mongoose.model('Category', categorySchema);
