var mongoose = require('mongoose');
var QuizModel = require("../models/quiz");
var HighscoreModel = require("../models/highscore");
QuizModel.remove({}, function(err){
  console.log(err);
});
HighscoreModel.remove({}, function(err){
  console.log(err);
});

// One Quiz, One Highscore
var quiz1 = new QuizModel({
  name: "Wolves in Literature",
  githubgist: "https://gist.githubusercontent.com/toryburgett/7b93b75dab7ec6c75fed/raw/d7d6f463a1d8ee2eaa4de2a772e1f523450c9698/story.json",
});
quiz1.save();
var quiz1Id = quiz1._id;

var highscore1 = new HighscoreModel({
  score: 0,
  username: "Mr. Big Bad",
  quizId: quiz1Id,
  questionsAnswered: 3,
  questionsTotal: 3,
  questionsRight: 0,
  questionsWrong: 3
});
highscore1.save();

quiz1.highscores.push(highscore1);
quiz1.save();

// One Quiz, One Highscore
var quiz2 = new QuizModel({
  name: "Wolves in Mythology",
  githubgist: "https://gist.githubusercontent.com/toryburgett/ea4a1fbce9e53f18b0f2/raw/1331b1049e46d7d932b44549543643efd6332a0f/history.json",
});
quiz2.save();
var quiz2Id = quiz2._id;

var highscore2 = new HighscoreModel({
  score: 1,
  username: "Prof. Lupin",
  quizId: quiz2Id,
  questionsAnswered: 3,
  questionsTotal: 3,
  questionsRight: 3,
  questionsWrong: 0
});
highscore2.save();

quiz2.highscores.push(highscore2);
quiz2.save();
