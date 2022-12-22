const express = require("express");
const router = express.Router();
const requestDataController = require("../controllers/requestData");
const isAuth = require("../middleware/is-auth");

router.get("/api/getRequestData", isAuth, requestDataController.getRequestData);
router.post("/api/addRequestData", requestDataController.addRequestData);
router.delete(
  "/api/deleteRequestData/:id",
  isAuth,
  requestDataController.deleteRequestData,
);

module.exports = router;
