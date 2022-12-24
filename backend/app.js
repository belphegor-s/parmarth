const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = 8080 || process.env.PORT;
const dotenv = require("dotenv");
dotenv.config();

//Routes
const requestDataRoutes = require("./routes/requestData");
const authRoutes = require("./routes/auth");
const rteRoutes = require("./routes/rteData");
const volunteersRoutes = require("./routes/volunteers");
const postRoutes = require("./routes/post");
const approveRequestRoute = require("./routes/approveRequest");
const status2FARoute = require("./routes/status2FA");
const verify2FARoute = require("./routes/verify2FACode");

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "OPTIONS, GET, POST, PUT, PATCH, DELETE",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization",
    );
    next();
  });
}

app.use("uploads", express.static(path.join(__dirname, "uploads")));
app.use(requestDataRoutes);
app.use(authRoutes);
app.use(rteRoutes);
app.use(volunteersRoutes);
app.use(postRoutes);
app.use(approveRequestRoute);
app.use(status2FARoute);
app.use(verify2FARoute);

mongoose
  .connect(process.env.MONGOURI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Express server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
