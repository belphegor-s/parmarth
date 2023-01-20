const express = require("express");
const router = express.Router();
const VolunteersDataController = require("../controllers/volunteers");
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
  "/api/getVolunteersData",
  isAuth,
  VolunteersDataController.getVolunteersData,
);

router.post(
  "/api/addVolunteerData",
  isAuth,
  VolunteersDataController.addVolunteerData,
);
router.post(
  "/api/addVolunteerDataViaExcel",
  isAuth,
  upload,
  VolunteersDataController.addVolunteerDataViaExcel,
);

module.exports = router;
