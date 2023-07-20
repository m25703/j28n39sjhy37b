const express = require("express");
const router = express.Router();
const { Posts, interacts } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", validateToken, async (req, res) => {
  const listOfPosts = await Posts.findAll({ include: [interacts] });
  const interactdPosts = await interacts.findAll({ where: { UserId: req.user.id } });
  res.json({ listOfPosts: listOfPosts, interactdPosts: interactdPosts });
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [interacts],
  });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  post.UserId = req.user.id;
  await Posts.create(post);
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});

  // Retrieve all available topics
router.get("/topics", async (req, res) => {
  try {
    const topics = await Posts.findAll({
      attributes: ["topic"],
      group: ["topic"],
    });
    res.json(topics.map((topic) => topic.topic));
  } catch (error) {
    console.error("Error retrieving topics:", error);
    res.status(500).json({ error: "Failed to retrieve topics" });
  }
});


module.exports = router;
