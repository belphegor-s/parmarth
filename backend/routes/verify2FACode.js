const express = require("express");
const router = express.Router();
const verify2FACodeController = require("../controllers/verify2FACode");

router.post("/api/verify2FACode", verify2FACodeController.verify2FACode);

module.exports = router;
