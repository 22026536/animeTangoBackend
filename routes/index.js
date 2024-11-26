import express from 'express';
import Anime from '../models/Anime.js';
const router = express.Router();

// Get all anime
router.get('/', async (req, res) => {
  try {
    res.json("animes");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new anime
router.post('/', async (req, res) => {
  const anime = new Anime({
    title: req.body.title,
    episodes: req.body.episodes,
    description: req.body.description,
    lessons: req.body.lessons,
  });

  try {
    const newAnime = await anime.save();
    res.status(201).json(newAnime);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router