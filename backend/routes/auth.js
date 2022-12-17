const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

router.post("/login", authController.login);
router.post("/createUser", isAuth, authController.createUser);
router.get("/getUsers", isAuth, authController.getUsers);

module.exports = router;
