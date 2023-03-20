const EventVolunteer = require("../models/eventVolunteers");
var XLSX = require("xlsx");
const fs = require("fs");

exports.getEventVolunteersData = (req, res, next) => {
  EventVolunteer.find()
    .then((volunteers) => {
      res.status(200).json(volunteers);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.addEventVolunteerDataViaExcel = (req, res, next) => {
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

      if (col === "E" || col === "G" || col === "H") {
        volunteersData[row][headers[col]] = +value;
      } else {
        volunteersData[row][headers[col]] = value.toString().toUpperCase();
      }
    }
    volunteersData.shift();
    volunteersData.shift();
  });

  EventVolunteer.insertMany(volunteersData)
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
