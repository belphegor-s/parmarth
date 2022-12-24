const express = require("express");
const router = express.Router();
const status2FAController = require("../controllers/status2FA");
const isAuth = require("../middleware/is-auth");

router.patch("/api/status2FA", isAuth, status2FAController.status2FA);

module.exports = router;
