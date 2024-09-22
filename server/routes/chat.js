import express from 'express';
import Chat from '../models/chat.js';

const router = express.Router();

// POST new message
router.post('/', async (req, res) => {
  const { gameId, name, message } = req.body;

  const newChat = new Chat({ gameId, name, message });

  try {
    await newChat.save();
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET messages for a specific game
router.get('/:gameId', async (req, res) => {
  try {
    const chats = await Chat.find({ gameId: req.params.gameId }).sort({ createdAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
