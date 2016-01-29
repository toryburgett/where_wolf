var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/wherewolves');

var Schema = mongoose.Schema,
  ObjectId = Schema.ObjectId;

var HighscoreSchema = new Schema({
  score: Number,
  username: String,
  quizId: String,
  questionsAnswered: Number,
  questionsTotal: Number,
  questionsRight: Number,
  questionsWrong: Number
});

var QuizSchema = new Schema({
  name: String,
  githubgist: String,
  highscores: [HighscoreSchema]
});

var QuizModel = mongoose.model("Quiz", QuizSchema);
var HighscoreModel = mongoose.model("Highscore", HighscoreSchema);
