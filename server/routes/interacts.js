const express = require("express");
const router = express.Router();
const { interacts } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", validateToken, async (req, res) => {
  const { PostId, customNumber } = req.body;
  const UserId = req.user.id;

  const found = await interacts.findOne({
    where: { PostId: PostId, UserId: UserId },
  });

  if (!found) {
    // If the entry doesn't exist, create a new one with the customNumber
    await interacts.create({ PostId: PostId, UserId: UserId, interactIncrement: customNumber });
    res.json({ interactd: true });
  } else {
    // If the entry exists, update the count with the customNumber
    const updatedinteracts = await interacts.update(
      { interactIncrement: customNumber,
      updatedAt: Date.now() },
      { where: { PostId: PostId, UserId: UserId } }
    );
    if (updatedinteracts[0] === 1) {
      res.json({ interactd: false });
    } else {
      res.status(500).json({ error: "Failed to update interacts count." });
    }
  }
});

router.get("/:PostId", validateToken, async (req, res) => {
  const { PostId } = req.params;
  const UserId = req.user.id;

  try {
    const interact = await interacts.findOne({
      where: { UserId: UserId, PostId: PostId },
    });
    if (interact) {
      res.json({ interactIncrement: interact.interactIncrement });
    } else {
      res.json({ interactIncrement: 3 });
    }
  } catch (error) {
    res.json({ interactIncrement: 1 });
  }
});

module.exports = router;
