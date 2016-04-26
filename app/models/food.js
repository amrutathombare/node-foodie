var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    food_name: {
        type: String,
        default: ''
    },
    price: Number
});