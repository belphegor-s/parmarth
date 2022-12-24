const jwt = require("jsonwebtoken");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  let loadedUser;

  Admin.findOne({ email: email })
    .then((data) => {
      if (!data) {
        res.status(422).json({ error: "User Not found!" });
        return "user not found";
      }
      loadedUser = data;
      return bcrypt.compare(password, data.password);
    })
    .then((isEqual) => {
      if (isEqual !== "user not found") {
        if (!isEqual) {
          return res.status(422).json({ error: "Wrong Password!" });
        } else {
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

          return res.status(200).json({
            token: token,
            userId: loadedUser._id.toString(),
            expiresIn: 3600,
          });
        }
      }
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.createUser = (req, res, next) => {
  const { email, password } = req.body;

  const isEmailValid = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  const isPasswordValid = (password) => password.length >= 8;

  if (!isEmailValid(email)) {
    return res.status(500).send({ error: "Enter a valid email address" });
  }

  if (!isPasswordValid(password)) {
    return res
      .status(500)
      .send({ error: "Password should be at least 8 characters" });
  }

  Admin.findOne({ email: email })
    .then((data) => {
      if (!data) {
        bcrypt.hash(password.trim(), 10, (err, hash) => {
          if (err) {
            return res.status(500).send({ error: err });
          } else if (hash) {
            data = new Admin({
              email: email.trim(),
              password: hash,
              status2FA: false,
            });

            data
              .save()
              .then(() => {
                console.log("Created User");
                return res
                  .status(200)
                  .json({ message: "Successfully created a user" });
              })
              .catch((err) => res.status(500).json({ error: err }));
          }
        });
      } else if (data.email === email.trim()) {
        return res.status(422).json({ error: "Same User already exist" });
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};

exports.getUsers = (req, res, next) => {
  Admin.find({ email: { $exists: true } }, { email: 1 })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "No User found" });
      } else if (data) {
        return res.status(200).json(data);
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};
