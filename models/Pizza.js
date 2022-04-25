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
    toppings: [],
    //tell Mongoose to expect an ObjectID -- the Comment model
    comments: [
        {
            type: Schema.Types.ObjectId,
            //refer to doc to find the right commands
            ref: 'Comment'
        }
    ],
},
{
    toJSON: {
      virtuals: true,
    },
    //this is a virtual that Mongoose returns, so we don't need it
    id: false
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
  });


//create Pizza  model using Pizza model that Mongoose provides
const Pizza = model('Pizza', PizzaSchema);

//export the Pizza model to the
module.exports = Pizza;