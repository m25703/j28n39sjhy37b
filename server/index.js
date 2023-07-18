const express = require("express");
const app = express();
const cors = require("cors");
// const { createProxyMiddleware } = require("http-proxy-middleware");

app.use(express.json());
app.use(cors());

// Existing routes and middleware
const db = require("./models");
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
app.use("/likes", likesRouter);

// app.use(
//   "/api", // Update the endpoint URL to "/api"
//   createProxyMiddleware({
//     target: "https://api.chatgpt.com",
//     changeOrigin: true,
//     pathRewrite: {
//       "^/api": "/v1/chat/completions",
//     },
//   })
// );

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
