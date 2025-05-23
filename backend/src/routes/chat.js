const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { Chat } = require("../models/chat");

const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  const { targetUserId } = req.params;
  const userId = req.user._id;

  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    const formattedMessages = chat.messages.map((msg) => ({
      senderId: msg.senderId,
      text: msg.text,
      createdAt: msg.createdAt,
    }));

    res.json({ messages: formattedMessages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching chat messages" });
  }
});

module.exports = chatRouter;
