const express = require("express");
const router = express.Router();
const postController = require("../controllers/post");
const isAuth = require("../middleware/is-auth");

router.get("/getPosts", postController.getPosts);
router.get("/getPost/:id", postController.getPostById);
router.post("/addPost", isAuth, postController.addPost);
router.put("/editPost/:id", isAuth, postController.editPost);
router.delete("/deletePost/:id", isAuth, postController.deletePost);

module.exports = router;
