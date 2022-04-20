//only need Schema constructor and model fxn from mongoose library
const { Schema, model } = require('mongoose');

const PizzaSchema = new Schema({
    pizzaName: {
        type:String
    },
    createdBy: {
        type:String
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    size: {
        type:String,
        default: 'Large'
    },
    toppings: []
});

//create Pizza  model using Pizza model that Mongoose provides
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model to the
module.exports = Pizza;