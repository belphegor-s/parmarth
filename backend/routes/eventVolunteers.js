const express = require("express");
const router = express.Router();
const EventVolunteersDataController = require("../controllers/eventVolunteers");
const isAuth = require("../middleware/is-auth");
const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, res, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, Math.random().toString(36).slice(-6) + "-" + file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
}).single("excelFile");

router.get(
  "/api/getEventVolunteersData",
  isAuth,
  EventVolunteersDataController.getEventVolunteersData,
);

router.post(
  "/api/addEventVolunteerDataViaExcel",
  isAuth,
  upload,
  EventVolunteersDataController.addEventVolunteerDataViaExcel,
);

module.exports = router;
