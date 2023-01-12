const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");

router.get("/api/getPosts", postController.getPosts);
router.get("/api/getPost/:id", postController.getPostById);
router.get(
  "/api/getPostByCategory/:category",
  postController.getPostByCategory,
);
router.post("/api/addPost", isAuth, postController.addPost);
router.put("/api/editPost/:id", isAuth, postController.editPost);
router.delete("/api/deletePost/:id", isAuth, postController.deletePost);

module.exports = router;
