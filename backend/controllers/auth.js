const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const fs = require("fs");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_APP_PSWD,
  },
});

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
        } else if (loadedUser.status2FA) {
          const authCode = Math.floor(10000000 + Math.random() * 90000000);

          const details = {
            from: process.env.EMAIL,
            to: loadedUser.email,
            cc: process.env.EMAIL,
            subject: "Parmarth 2FA Authentication Code",
            html: `<img draggable="false" src="https://drive.google.com/uc?id=1VD0pfPT3F_iTP1BgjERkub2GA-UEmAPM" width="100px" height="100px"/><p>Hi ${loadedUser.email},</p><p>Your <strong>2FA</strong> Authentication code is - <strong>${authCode}</strong></p><p>Regards,<br/>Team Parmarth</p><p><a href="https://parmarth.ietlucknow.ac.in/" target="_blank" rel="noreferrer">Parmarth Social Club</a>, IET Lucknow</p>`,
          };

          transporter.sendMail(details, (err) => {
            if (err) {
              return res.status(422).json({ error: err.message });
            } else {
              fs.writeFileSync(
                `authCode-${loadedUser._id}.txt`,
                authCode.toString(),
                "utf-8",
              );

              return res.status(200).json({
                message: "Successfully sent 2FA code to email",
                userId: loadedUser._id,
              });
            }
          });
        } else {
          const token = jwt.sign(
            {
              email: loadedUser.email,
              userId: loadedUser._id.toString(),
            },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "12h",
            },
          );

          return res.status(200).json({
            token: token,
            userId: loadedUser._id.toString(),
            expiresIn: 43200,
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
  Admin.find({ email: { $exists: true } }, { email: 1, status2FA: 1 })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ error: "No User found" });
      } else if (data) {
        return res.status(200).json(data);
      }
    })
    .catch((err) => res.status(500).json({ error: err }));
};
