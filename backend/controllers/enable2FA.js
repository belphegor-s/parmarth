const Admin = require("../models/admin");

exports.enable2FA = (req, res, next) => {
  const { userId } = req.body;

  Admin.findById(userId)
    .then((data) => {
      if (!data) {
        res.status(422).json({ error: "User with this ID doesn't exist" });
        return "user not found";
      }

      data.status2FA = true;
      return data.save();
    })
    .then((result) => {
      if (result !== "user not found") {
        res
          .status(200)
          .json({ message: "Successfully enabled 2FA for this user" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ error: err.message });
    });
};
