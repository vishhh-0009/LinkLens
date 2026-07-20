require("dotenv").config();

const express = require("express");
const cors = require("cors");
require("./config/db");
const linkRoutes = require("./routes/linkRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/links", linkRoutes);

app.get("/", (req, res) => {
  res.send("LinkLens Backend Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
