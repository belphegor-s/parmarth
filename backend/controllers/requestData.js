const Request = require("../models/request");
const Volunteer = require("../models/volunteers");
const Certificate = require("../models/certificate");

exports.getRequestData = (req, res, next) => {
  Request.find()
    .then((requests) => {
      res.status(200).json(requests);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.addRequestData = (req, res, next) => {
  // Validation
  const { name, email, branch, rollNumber, purpose } = req.body;

  var postHolded = "",
    event = "";
  if (purpose === "general") {
    postHolded = req.body.postHolded;
  } else if (purpose === "event") {
    event = req.body.event;
  }

  const isNameValid = (name) => /^[a-zA-Z ]{2,30}$/.test(name);

  const isEmailValid = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

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
  } else if (!isBranchValid(branch)) {
    return res.status(422).json({ error: "Enter your branch" });
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

  var dataExist = null;
  Volunteer.findOne({
    name: name.trim().toUpperCase(),
    branch: branch.trim(),
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
              branch: branch,
              rollNumber: +rollNumber,
              purpose: purpose,
              ...(purpose === "general" && {
                postHolded: postHolded,
              }),
              ...(purpose === "event" && { event: event }),
            })
              .then((result) => {
                if (!result) {
                  const requestData = new Request({
                    name: name.trim().toUpperCase(),
                    email: email.trim().toLowerCase(),
                    branch: branch.trim(),
                    rollNumber: +rollNumber,
                    purpose: purpose.trim(),
                    ...(purpose === "general" && { postHolded: postHolded }),
                    ...(purpose === "event" && { event: event }),
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
