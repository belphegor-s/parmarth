const Request = require("../models/request");
const Volunteer = require("../models/volunteers");
const EventVolunteer = require("../models/eventVolunteers");
const Certificate = require("../models/certificate");

exports.getRequestData = async (req, res, next) => {
  const { purpose } = req.body;

  if (purpose === "general") {
    Request.find({ purpose: "general" })
      .then((requests) => {
        res.status(200).json(requests);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } else if (purpose === "event") {
    Request.find({ purpose: "event" })
      .then((requests) => {
        res.status(200).json(requests);
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  }
};

exports.addRequestData = (req, res, next) => {
  // Validation
  const { name, email, course, rollNumber, purpose } = req.body;

  var postHolded = "",
    event = "",
    academicYear = "";
  if (purpose === "general") {
    postHolded = req.body.postHolded;
  } else if (purpose === "event") {
    event = req.body.event;
    academicYear = req.body.academicYear;
  }

  var branch = "";
  if (course === "B.Tech.") {
    branch = req.body.branch;
  }

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);

  const isEmailValid = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isRollNumberValid = (rollNumber) => rollNumber.toString().length === 13;

  const isCourseValid = (course) => {
    switch (course) {
      case "B.Tech":
      case "M.Tech":
      case "MBA":
      case "MCA":
        return true;

      default:
        return false;
    }
  };

  const isPostHoldedValid = (postHolded) =>
    typeof postHolded === "string" && postHolded.trim().length > 0;

  const isEventValid = (event) => {
    switch (event) {
      case "muskan":
      case "udgam":
        return true;
      default:
        return false;
    }
  };

  if (!isNameValid(name)) {
    return res.status(422).json({ error: "Enter a valid name" });
  } else if (!isEmailValid(email)) {
    return res.status(422).json({ error: "Enter a valid email" });
  } else if (!isRollNumberValid(rollNumber)) {
    return res.status(422).json({ error: "Enter a valid roll number" });
  } else if (!isCourseValid(course)) {
    return res.status(422).json({ error: "Enter your course" });
  }

  if (purpose === "general") {
    if (!isPostHoldedValid(postHolded)) {
      return res.status(422).json({ error: "Enter your Post" });
    }
  } else if (purpose === "event") {
    if (!isEventValid(event)) {
      return res.status(422).json({ error: "Select a valid Event" });
    }
  }

  if (purpose === "general") {
    var dataExist = null;
    Volunteer.findOne({
      name: name.trim().toUpperCase(),
      course: course.trim(),
      rollNumber: +rollNumber,
    })
      .then((data) => {
        if (!data) {
          dataExist = false;
        } else if (data.rollNumber === rollNumber) {
          dataExist = true;
        }

        Request.findOne({ rollNumber: rollNumber })
          .then((data) => {
            if (!data) {
              Certificate.findOne({
                name: name.toUpperCase(),
                email: email.toLowerCase(),
                course: course.trim().toUpperCase(),
                rollNumber: +rollNumber,
                purpose: purpose,
                ...(course === "B.Tech." && { branch: branch }),
                event: event,
              })
                .then((result) => {
                  if (!result) {
                    const requestData = new Request({
                      name: name.trim().toUpperCase(),
                      email: email.trim().toLowerCase(),
                      course: course.trim().toUpperCase(),
                      ...(course === "B.Tech." && { branch: branch }),
                      rollNumber: +rollNumber,
                      purpose: purpose.trim(),
                      postHolded: postHolded,
                      dataExist: dataExist,
                    });

                    if (requestData.dataExist === null) {
                      return res
                        .status(422)
                        .json({ error: "Couldn't check if data exists" });
                    }
                    requestData
                      .save()
                      .then(() => {
                        console.log("Added Data");
                        return res
                          .status(201)
                          .json({ message: "Successfully added your request" });
                      })
                      .catch((err) =>
                        res.status(500).json({ error: err.message }),
                      );
                  } else if (result.rollNumber === rollNumber) {
                    return res.status(422).json({
                      error: "Certificate already issued with same data",
                    });
                  }
                })
                .catch((err) => res.status(500).json({ error: err.message }));
            } else if (data.rollNumber === rollNumber) {
              return res
                .status(422)
                .json({ error: "Data with same roll number already exist" });
            }
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      })
      .catch((err) => res.status(500).json({ error: err.message }));
  } else if (purpose === "event") {
    EventVolunteer.find({
      name: name.trim().toUpperCase(),
      course: course.trim(),
      rollNumber: +rollNumber,
      event: event,
    }).then((data) => {
      var dataExist = false;
      if (!data) {
        const requestData = new Request({
          name: name.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
          course: course.trim().toUpperCase(),
          ...(course === "B.Tech." && { branch: branch }),
          rollNumber: +rollNumber,
          purpose: purpose.trim(),
          event: event,
          dataExist: dataExist,
        });

        requestData
          .save()
          .then(() => {
            console.log("Added Data");
            return res
              .status(201)
              .json({ message: "Successfully added your request" });
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      } else {
        dataExist = true;
        const requestData = new Request({
          name: name.trim().toUpperCase(),
          email: email.trim().toLowerCase(),
          course: course.trim().toUpperCase(),
          ...(course === "B.Tech." && { branch: branch }),
          rollNumber: +rollNumber,
          purpose: purpose.trim(),
          event: event,
          dataExist: dataExist,
        });

        requestData
          .save()
          .then(() => {
            console.log("Added Data");
            return res
              .status(201)
              .json({ message: "Successfully added your request" });
          })
          .catch((err) => res.status(500).json({ error: err.message }));
      }
    });
  }
};

exports.deleteRequestData = (req, res, next) => {
  const id = req.params.id;
  Request.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        return res.status(422).json({ error: "Couldn't find Data" });
      } else {
        return res.status(200).json({ message: "Data Deleted" });
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
