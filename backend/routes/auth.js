const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

router.post("/api/login", authController.login);
router.post("/api/createUser", isAuth, authController.createUser);
router.get("/api/getUsers", isAuth, authController.getUsers);

module.exports = router;
