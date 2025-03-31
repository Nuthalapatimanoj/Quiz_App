const express = require("express");
const Question = require("../models/Question");

const router = express.Router();

// Get all questions
router.get("/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

// Submit answers & calculate score
router.post("/submit", async (req, res) => {
  try {
    const { answers } = req.body;
    const questions = await Question.find();
    let score = 0;

    questions.forEach((q, index) => {
      if (q.correctAnswer === answers[index]) {
        score++;
      }
    });

    res.json({ score });
  } catch (error) {
    res.status(500).json({ error: "Failed to calculate score" });
  }
});

module.exports = router;