const Volunteer = require("../models/volunteers");
var XLSX = require("xlsx");
const fs = require("fs");

exports.getVolunteersData = (req, res, next) => {
  Volunteer.find()
    .then((volunteers) => {
      res.status(200).json(volunteers);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.addVolunteerData = (req, res, next) => {
  const { name, course, rollNumber, postHolded } = req.body;

  var branch = "";
  if (course === "B.Tech.") {
    branch = req.body.branch;
  }

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);

  const isRollNumberValid = (rollNumber) => rollNumber.toString().length === 13;

  const isCourseValid = (course) => {
    switch (course) {
      case "B.Tech.":
      case "M.Tech.":
      case "MBA":
      case "MCA":
        return true;

      default:
        return false;
    }
  };

  const isPostHoldedValid = (postHolded) =>
    typeof postHolded === "string" && postHolded.trim().length > 0;

  if (!isNameValid(name)) {
    return res.status(422).json({ error: "Enter a valid name" });
  } else if (!isRollNumberValid(rollNumber)) {
    return res.status(422).json({ error: "Enter a valid roll number" });
  } else if (!isCourseValid(course)) {
    return res.status(422).json({ error: "Enter your course" });
  } else if (!isPostHoldedValid(postHolded)) {
    return res.status(422).json({ error: "Enter Post Holded" });
  }

  Volunteer.findOne({
    name: name.trim().toUpperCase(),
    course: course.trim().toUpperCase(),
    rollNumber: +rollNumber,
    postHolded: postHolded.trim().toUpperCase(),
    ...(course === "B.Tech." && { branch: branch }),
  })
    .then((data) => {
      if (!data) {
        const volunteerData = new Volunteer({
          name: name.trim().toUpperCase(),
          course: course.trim().toUpperCase(),
          rollNumber: +rollNumber,
          postHolded: postHolded.trim().toUpperCase(),
          ...(course === "B.Tech." && { branch: branch }),
        });
        volunteerData
          .save()
          .then(() => {
            console.log("Added Data");
            return res.status(201).json({ message: "Successfully added data" });
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      } else if (data.name === name.trim().toUpperCase()) {
        return res.status(422).json({ error: "Data Already Exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.addVolunteerDataViaExcel = (req, res, next) => {
  if (!req.file) {
    return res.status(422).json({ error: "Upload an Excel file" });
  }

  const filePath = req.file.path;

  var workbook = XLSX.readFile(filePath);
  var sheetNameList = workbook.SheetNames;

  var volunteersData = [];

  sheetNameList.forEach((y) => {
    var worksheet = workbook.Sheets[y];
    var headers = {};
    function camelCase(str) {
      return str
        .replace(/\s(.)/g, function (a) {
          return a.toUpperCase();
        })
        .replace(/\s/g, "")
        .replace(/^(.)/, function (b) {
          return b.toLowerCase();
        });
    }
    for (z in worksheet) {
      if (z[0] === "!") continue;
      var col = z.substring(0, 1);
      var row = parseInt(z.substring(1));
      var value = worksheet[z].v;
      if (row == 1) {
        headers[col] = camelCase(value.trim());
        continue;
      }
      if (!volunteersData[row]) volunteersData[row] = {};

      if (col === "D") {
        volunteersData[row][headers[col]] = +value;
      } else {
        volunteersData[row][headers[col]] = value.toString().toUpperCase();
      }
    }
    volunteersData.shift();
    volunteersData.shift();
  });

  Volunteer.insertMany(volunteersData)
    .then(() => {
      console.log("Data added");
      fs.unlinkSync(filePath, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        } else {
          console.log("File deleted");
        }
      });
      return res.status(200).json({ message: "Successfully added data" });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
