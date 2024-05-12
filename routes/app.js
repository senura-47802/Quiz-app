const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const Quiz = require("../models/quiz");
const map = require("map");
const params = require("express-params");
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.render("index", { quizzes });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});

router.get("/quiz/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.render("quiz", { quiz });
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});
router.get("/addQuiz", (req, res) => {
  res.render("addquiz");
});
router.post("/addQuiz", async (req, res) => {
  try {
    const quiz = new Quiz({
      title: req.body.title,
      questions: req.body.questions,
    });
    await quiz.save();
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("error");
  }
});
router.post("/quiz/:id/score", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).render("error"); 
    }

    const answers = req.body.answers.map(Number);
    const score = calculateScore(quiz, answers);

    res.render("score", { score, quiz });
  } catch (err) {
    console.error("Error:", err);
    res.render("error"); 
  }
});
router.get("/quiz/:id/score", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).render("error");
    }
    res.render("score", { score: 0, quiz });
  } catch (err) {
    console.error("Error:", err);
    res.render("error");
  }
});
function calculateScore(quiz, answers) {
  let score = 0;
  quiz.questions.forEach((question, index) => {
    if (answers[index] === question.correctIndex) {
      score++; 
    }
  });
  return score;
}
router.post("/quiz/:id/score", async (req, res) => {
  console.log("Submitting answers for quiz:", req.params.id);
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      console.error("Quiz not found:", req.params.id);
      return res.status(404).render("error");
    }

    const answers = req.body.answers.map(Number);
    const score = calculateScore(quiz, answers);

    console.log("Score calculated:", score); 
    res.render("score", { score, quiz });
  } catch (err) {
    console.error("Error while calculating score:", err); 
    res.render("error");
  }
});

module.exports = router;
