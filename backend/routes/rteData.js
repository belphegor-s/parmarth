const express = require("express");
const router = express.Router();
const rteDataController = require("../controllers/rteData");
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

router.get("/getRteData", rteDataController.getRteData);
router.get(
  "/getRteData/:academicYear",
  rteDataController.getRteDataByAcademicYear
);
router.post("/addRteData", isAuth, rteDataController.addRteData);
router.post(
  "/addRteDataViaExcel",
  isAuth,
  upload,
  rteDataController.addRteDataViaExcel
);

module.exports = router;
