const { Pizza, Comment } = require('../models');

const commentController = { 
    //add comment to pizza
    addComment({ params, body }, res ) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                //add comment's __id to specific pizza we went to update (from the array)
                { $push: { comments: _id } },
                { new: true }
                );
            })
            .then(dbPizzaData => {
                if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
    },

    //delete comment & remove comment from associated pizza
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
          .then(deletedComment => {
            if (!deletedComment) {
              return res.status(404).json({ message: 'No comment with this id!' });
            }
            return Pizza.findOneAndUpdate(
              { _id: params.pizzaId },
              //take data and remove it from pizza
              { $pull: { comments: params.commentId } },
              { new: true }
            );
          })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            //return pizza without the deleted _id of the comment
            res.json(dbPizzaData);
          })
          .catch(err => res.json(err));
      }
};

module.exports = commentController;