const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId, customNumber } = req.body;
  const UserId = req.user.id;

  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });

  if (!found) {
    // If the entry doesn't exist, create a new one with the customNumber
    await Likes.create({ PostId: PostId, UserId: UserId, likeIncrement: customNumber });
    res.json({ liked: true });
  } else {
    // If the entry exists, update the count with the customNumber
    const updatedLikes = await Likes.update(
      { likeIncrement: customNumber },
      { where: { PostId: PostId, UserId: UserId } }
    );
    if (updatedLikes[0] === 1) {
      res.json({ liked: false });
    } else {
      res.status(500).json({ error: "Failed to update likes count." });
    }
  }
});

router.get("/:PostId", validateToken, async (req, res) => {
  const { PostId } = req.params;
  const UserId = req.user.id;

  try {
    const like = await Likes.findOne({
      where: { UserId: UserId, PostId: PostId },
    });
    if (like) {
      res.json({ likeIncrement: like.likeIncrement });
    } else {
      res.json({ likeIncrement: 3 });
    }
  } catch (error) {
    res.json({ likeIncrement: 1 });
  }
});

module.exports = router;
