const express = require("express");
const router = express.Router();
const approveRequest = require("../controllers/approveRequest");
const isAuth = require("../middleware/is-auth");

router.post("/api/approveRequest/:id", isAuth, approveRequest.approveRequest);

module.exports = router;
