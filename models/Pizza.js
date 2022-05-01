//only need Schema constructor and model fxn from mongoose library
const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const PizzaSchema = new Schema(
  {
    pizzaName: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: String,
      required: true,
      trim: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      //the value will be formatted by dateFormat() fxn instead of default, so it's prettier
      get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
      type: String,
      enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
      default: "Large"
    },
    toppings: [],
    //tell Mongoose to expect an ObjectID -- the Comment model
    comments: [
      {
        type: Schema.Types.ObjectId,
        //refer to doc to find the right commands
        ref: "Comment"
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    //this is a virtual that Mongoose returns, so we don't need it
    id: false,
  }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual("commentCount").get(function () {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//create Pizza  model using Pizza model that Mongoose provides
const Pizza = model("Pizza", PizzaSchema);

//export the Pizza model to the
module.exports = Pizza;
