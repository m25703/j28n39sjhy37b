const express = require("express");
const app = express();
const cors = require("cors");
// require("dotenv").config(); // <- Load environment variables from .env file

app.use(express.json());
app.use(cors());

// Existing routes and middleware
const db = require("./models");
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const interactsRouter = require("./routes/interacts");
app.use("/interacts", interactsRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
