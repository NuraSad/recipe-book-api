const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
const app = express();
const apiPort = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on("error", console.error.bind(console, "MongoDB connection error:"));
const recipeRouter = require("./routes/recipe-router");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", recipeRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
