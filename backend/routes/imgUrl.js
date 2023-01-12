const express = require("express");
const router = express.Router();
const imgUrlController = require("../controllers/imgUrl");
const isAuth = require("../middleware/is-auth");

router.post("/api/getImgUrl", isAuth, imgUrlController.getImgUrl);

module.exports = router;
