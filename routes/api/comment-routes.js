const router = require("express").Router();
const {
  addComment,
  removeComment,
  addReply,
  removeReply,
} = require("../../controllers/comment-controller");

// /api/comments:pizzaId
router.route("/:pizzaId").post(addComment);

// delete /api/comments/:pizzaId/:commentId
router.route("/:pizzaId/:commentId").put(addReply).delete(removeComment);

//delete route for removeReply; needs id of individual reply- not the parent
router.route("/:pizzaId/:commentId/:replyId").delete(removeReply);

module.exports = router;
