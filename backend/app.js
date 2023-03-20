const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const PORT = 8080 || process.env.PORT;
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

//Routes
const requestDataRoutes = require("./routes/requestData");
const authRoutes = require("./routes/auth");
const rteRoutes = require("./routes/rteData");
const volunteersRoutes = require("./routes/volunteers");
const eventVolunteersRoutes = require("./routes/eventVolunteers");
const postRoutes = require("./routes/post");
const approveRequestRoute = require("./routes/approveRequest");
const status2FARoute = require("./routes/status2FA");
const verify2FARoute = require("./routes/verify2FACode");
const imgUrlRoute = require("./routes/imgUrl");

const app = express();

app.use(express.json({ limit: "10mb" }));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" },
);

app.use(helmet());
app.use(compression());
app.use(morgan("combined", { stream: accessLogStream }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("uploads", express.static(path.join(__dirname, "uploads")));
app.use(requestDataRoutes);
app.use(authRoutes);
app.use(rteRoutes);
app.use(volunteersRoutes);
app.use(eventVolunteersRoutes);
app.use(postRoutes);
app.use(approveRequestRoute);
app.use(status2FARoute);
app.use(verify2FARoute);
app.use(imgUrlRoute);

mongoose
  .connect(process.env.MONGOURI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Express server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
