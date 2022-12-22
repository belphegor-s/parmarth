const express = require("express");
const router = express.Router();
const VolunteersDataController = require("../controllers/volunteers");
const isAuth = require("../middleware/is-auth");

router.get(
  "/api/getVolunteersData",
  isAuth,
  VolunteersDataController.getVolunteersData,
);

router.post(
  "/api/addVolunteerData",
  isAuth,
  VolunteersDataController.addVolunteerData,
);

module.exports = router;
