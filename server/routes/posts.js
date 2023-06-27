const express = require("express");
const router = express.Router();
const { posts } = require("../models");

router.get("/", async (req, res) => {
  const listOfposts = await posts.findAll();
  res.json(listOfposts);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await posts.create(post);
  res.json(post);
});

router.put("/:id", async (req, res) => {
  const { newText, id } = req.body;
  await posts.update({ lastIncrement: newText }, { where: { id: id } });
  res.json(newText);
});

router.delete("/:id", async (req, res) => {
  const postId = req.params.id;
  await posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
