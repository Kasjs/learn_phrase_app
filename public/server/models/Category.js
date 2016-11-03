const mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    Food: {
        type: Array,
        default: [
                {en: 'apple', uk: 'яблуко'}, {en: 'orange', uk: 'апельсин'},
                {en: 'bread', uk: 'хліб'}, {en: 'milk', uk: 'молоко'}, {en: 'water', uk: 'вода'},
                {en: 'juice', uk: 'сік'}, {en: 'cake', uk: 'тістечко'}
        ]
    },
    Sport: {
        type: Array,
        default: [
            {en: 'run', uk: 'бігти'}, {en: 'walk', uk: 'ходити'}, {en: 'ball', uk: 'м\'яч'}, {en: 'bow', uk: 'лук'}, {en: 'arrow', uk: 'стріла'},
            {en: 'jump', uk: 'стрибати'}, {en: 'sweam', uk: 'плавати'}, {en: 'football', uk: 'футбол'}
        ]
    },
    Nature: {
        type: Array,
        default: [{en: 'sky', uk: 'небо'}, {en: 'moon', uk: 'місяць'}, {en: 'earth', uk: 'земля'}, {en: 'forest', uk: 'ліс'}, {en: 'ocean', uk: 'океан'},
            {en: 'river', uk: 'річка'}, {en: 'leaf', uk: 'листок'}, {en: 'winter', uk: 'зима'}, {en: 'spring', uk: 'осінь'}, {en: 'ice', uk: 'лід'},
            {en: 'hot', uk: 'жара'}
        ]
    }
});
module.exports = mongoose.model('Category', categorySchema);
