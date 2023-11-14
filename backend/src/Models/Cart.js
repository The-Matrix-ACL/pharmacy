const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        type: String,
    },
    medications: [{
        medId: {
            type: String,
            required: true
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
        price: Number 
    }],
    bill: {
        type: Number,
        default: 0
    }
});

module.exports = Cart = mongoose.model('cart',CartSchema);

