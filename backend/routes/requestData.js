const express = require("express");
const router = express.Router();
const requestDataController = require("../controllers/requestData");
const isAuth = require("../middleware/is-auth");

router.get("/getRequestData", isAuth, requestDataController.getRequestData);
router.post("/addRequestData", requestDataController.addRequestData);
router.delete(
  "/deleteRequestData/:id",
  isAuth,
  requestDataController.deleteRequestData
);

module.exports = router;
