const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();
const apiPort = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

db.on("error", console.error.bind(console, "MongoDB connection error:"));
const recipeRouter = require("./routes/recipe-router");
require("./routes/auth-routes")(app);
require("./routes/user-routes")(app);
// const authRouter = require("./routes/auth-routes");
// const userRouter = require("./routes/user-routes");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", recipeRouter);
// app.use("/api", authRouter);
// app.use("/api", userRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
