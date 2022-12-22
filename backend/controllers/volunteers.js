const Volunteer = require("../models/volunteers");

exports.getVolunteersData = (req, res, next) => {
  Volunteer.find()
    .then((volunteers) => {
      console.log(volunteers);
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
