const Admin = require("../models/admin");
const fs = require("fs");
const jwt = require("jsonwebtoken");

exports.verify2FACode = (req, res, next) => {
  const { userId, enteredCode } = req.body;

  let loadedUser;

  Admin.findById(userId)
    .then((data) => {
      if (!data) {
        res.status(422).json({ error: "User Not found!" });
        return "user not found";
      }
      loadedUser = data;
    })
    .then((result) => {
      if (result !== "user not found") {
        const authCode = fs.readFileSync(`authCode-${userId}.txt`, "utf-8");

        if (authCode === enteredCode.toString()) {
          const token = jwt.sign(
            {
              email: loadedUser.email,
              userId: loadedUser._id.toString(),
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "1h",
            },
          );

          fs.unlinkSync(`authCode-${userId}.txt`);

          return res.status(200).json({
            token: token,
            userId: loadedUser._id.toString(),
            expiresIn: 3600,
          });
        } else {
          return res.status(422).json({ error: "2FA Code is not valid" });
        }
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
