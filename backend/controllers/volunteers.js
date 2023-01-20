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
  const { name, branch, rollNumber, postHolded } = req.body;

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);

  const isRollNumberValid = (rollNumber) => rollNumber.toString().length === 13;

  const isBranchValid = (branch) => {
    switch (branch) {
      case "CE":
      case "CH":
      case "CS":
      case "EC":
      case "EE":
      case "EI":
      case "IT":
      case "ME":
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
  } else if (!isBranchValid(branch)) {
    return res.status(422).json({ error: "Enter your branch" });
  } else if (!isPostHoldedValid(postHolded)) {
    return res.status(422).json({ error: "Enter Post Holded" });
  }

  Volunteer.findOne({
    name: name.trim().toUpperCase(),
    branch: branch.trim(),
    rollNumber: +rollNumber,
    postHolded: postHolded.trim().toUpperCase(),
  })
    .then((data) => {
      if (!data) {
        const volunteerData = new Volunteer({
          name: name.trim().toUpperCase(),
          branch: branch.trim(),
          rollNumber: +rollNumber,
          postHolded: postHolded.trim().toUpperCase(),
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

  var flag = false;
  const branches = ["CE", "CH", "CS", "EC", "EE", "EI", "IT", "ME"];

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

      if (col === "C") {
        volunteersData[row][headers[col]] = +value;
      } else if (col === "B") {
        if (branches.includes(value.toString().toUpperCase())) {
          volunteersData[row][headers[col]] = value.toString().toUpperCase();
        } else {
          flag = true;
          break;
        }
      } else {
        volunteersData[row][headers[col]] = value.toString().toUpperCase();
      }
    }
    volunteersData.shift();
    volunteersData.shift();
  });

  if (flag) {
    fs.unlinkSync(filePath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      } else {
        console.log("File deleted");
      }
    });
    return res
      .status(200)
      .json({ error: "Branch entered is Invalid or not in format" });
  }

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
