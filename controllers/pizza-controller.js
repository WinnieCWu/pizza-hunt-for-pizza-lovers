const { Pizza } = require("../models");

const pizzaController = {
  //the fxns will go here as methods
  //get all pizzas
  //aka cb for GET /api/pizzas route
  getAllPizza(req, res) {
    Pizza.find({})
      //to populate a field
      .populate({
        path: "comments",
        //the '-' indicates we don't want it (__v field returned
        select: "-__v",
      })
      //to not include the pizza neither
      .select("-__v")
      //return the newest pizza first, in descending order
      .sort({ _id: -1 })
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400)
      });
  },

  //get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .populate({
        path: 'comments',
        select: '-__v'
      })
      .select('-__v')
      .then((dbPizzaData) => 
        {
        //If no pizza is found, send 404 error
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //method to handle POST/api/pizzas
  //create Pizza and add to the db
  //destructure the body out of Express.js's req obj
  // createPizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzaData) => res.json(dbPizzaData))
      .catch((err) => res.json(400).json(err));
  },

  //method to handle PUT/api/pizzas/:id
  //update pizza by id
  updatePizza({ params, body }, res) {
    //if we don't say 3rd param {new:true}, it'll return the original document.
    //this returns the new version of doc
    //add runValidators:true so server knows to validate any new info
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then((dbPizzaData) => {
        if (!dbPizzaData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch((err) => res.status(400).json(err));
  },

  //method to delete pizza from db
  //DELETE/api/pizzas/:id
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;
