
const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      text: {
        type: String,
        required: true,
      },
      options: [String], 
      correctIndex: {
        type: Number,
        required: true,
      },
    },
  ],
});

quizSchema.methods.calculateScore = function (submittedAnswers) {
  let score = 0;

  this.questions.forEach((question, index) => {
    const correctIndex = question.correctIndex; 
    const submittedAnswer = submittedAnswers[index]; 
    if (submittedAnswer === correctIndex) {
      score += 1;
    }
  });

  return score;
};

module.exports = mongoose.model("Quiz", quizSchema);
