const express = require("express");
const router = express.Router();
const enable2FAController = require("../controllers/enable2FA");

router.patch("/api/enable2FA", enable2FAController.enable2FA);

module.exports = router;
