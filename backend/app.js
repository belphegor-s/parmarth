const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const PORT = 8080 || process.env.PORT;
const dotenv = require("dotenv");
dotenv.config();

const requestDataRoutes = require("./routes/requestData");
const authRoutes = require("./routes/auth");
const rteRoutes = require("./routes/rteData");
const volunteersRoutes = require("./routes/volunteers");
const postRoutes = require("./routes/post");
const approveRequest = require("./routes/approveRequest");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("uploads", express.static(path.join(__dirname, "uploads")));
app.use(requestDataRoutes);
app.use(authRoutes);
app.use(rteRoutes);
app.use(volunteersRoutes);
app.use(postRoutes);
app.use(approveRequest);

mongoose
  .connect(process.env.MONGOURI)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`Express server listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err));
