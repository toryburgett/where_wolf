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
  name: "First Quiz",
  githubgist: "https://gist.githubusercontent.com/toryburgett/71493221c7927a506592/raw/6f2e585b33cc93ffffadbc28888a9e0a5ae9d634/quiz.json",
});
quiz1.save();
var quiz1Id = quiz1._id;

var highscore1 = new HighscoreModel({
  score: 90,
  username: "player1",
  quizId: quiz1Id
});
highscore1.save();

quiz1.highscores.push(highscore1);
quiz1.save();

// One Quiz, One Highscore
var quiz2 = new QuizModel({
  name: "Second Quiz",
  githubgist: "https://gist.githubusercontent.com/toryburgett/71493221c7927a506592/raw/6f2e585b33cc93ffffadbc28888a9e0a5ae9d634/quiz.json",
});
quiz2.save();
var quiz2Id = quiz2._id;

var highscore2 = new HighscoreModel({
  score: 90,
  username: "player2",
  quizId: quiz2Id
});
highscore2.save();

quiz2.highscores.push(highscore2);
quiz2.save();