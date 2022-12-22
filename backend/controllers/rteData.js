const Rte = require("../models/rte");
const fs = require("fs");
var XLSX = require("xlsx");

exports.getRteData = (req, res, next) => {
  Rte.find()
    .then((rteData) => {
      res.status(200).json(rteData);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getRteDataByAcademicYear = (req, res, next) => {
  const academicYear = req.params.academicYear;

  Rte.find({ academicYear: academicYear })
    .then((rteData) => {
      res.status(200).json(rteData);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.addRteData = (req, res, next) => {
  const { studentName, classStudying, school, academicYear } = req.body;

  const isStuddentNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);
  const isClassStudyingValid = (classStudying) =>
    classStudying.trim().length > 0;
  const isSchoolValid = (school) => school.trim().length > 0;
  const isAcademicYearValid = (academicYear) =>
    /\d\d\d\d-\d\d/i.test(academicYear);

  if (!isStuddentNameValid(studentName)) {
    return res.status(422).json({ error: "Enter a valid name" });
  } else if (!isClassStudyingValid(classStudying)) {
    return res.status(422).json({ error: "Enter Class" });
  } else if (!isSchoolValid(school)) {
    return res.status(422).json({ error: "Enter School Name" });
  } else if (!isAcademicYearValid(academicYear)) {
    return res.status(422).json({ error: "Enter a valid Academic Year" });
  }

  const newData = {
    studentName: studentName.trim().toUpperCase(),
    classStudying: classStudying.trim().toUpperCase(),
    school: school.trim().toUpperCase(),
    academicYear: academicYear.trim().toUpperCase(),
  };

  Rte.findOne(newData)
    .then((data) => {
      if (!data) {
        const newStudent = new Rte(newData);
        newStudent
          .save()
          .then(() => {
            console.log("Added Data");
            return res.status(201).json({ message: "Successfully added data" });
          })
          .catch((err) => res.status(500).json({ error: err }));
      } else if (data.studentName === newData.studentName) {
        return res.status(422).json({ error: "Same data already exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.addRteDataViaExcel = (req, res, next) => {
  if (!req.file) {
    return res.status(422).json({ error: "Upload an Excel file" });
  }

  const filePath = req.file.path;

  var workbook = XLSX.readFile(filePath);
  var sheetNameList = workbook.SheetNames;

  var studentsData = [];

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
      if (!studentsData[row]) studentsData[row] = {};
      studentsData[row][headers[col]] = value.toString().toUpperCase();
    }
    studentsData.shift();
    studentsData.shift();
  });

  Rte.insertMany(studentsData)
    .then(() => {
      console.log("Data added");
      fs.unlink(filePath, (err) => {
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
