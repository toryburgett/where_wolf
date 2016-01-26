var express = require("express");
var router = express.Router();
var QuizModel = require("../models/quiz");
var HighscoreModel = require("../models/highscore");

var router = {
  index: function(req, res){
    QuizModel.find({}, function(err, quizzes){
      res.json(quizzes);
    });
  },
  create: function(req, res){
    new QuizModel({
      name: req.body.name,
      githubgist: req.body.githubgist,
      highscores: []
      }).save(function(err, quiz){
      res.json(quiz);
    });
  },
  show: function(req, res){
    QuizModel.findById(req.params.id, function(err, quiz){
      res.json(quiz);
    });
  },
  update: function(req,res){
    QuizModel.findById(req.params.id, function(err, quiz){
      quiz.name = req.body.name;
      quiz.githubgist = req.body.githubgist;
      quiz.highscores = req.body.highscores;
      quiz.save(function(err, quiz){
        res.json(quiz);
      });
    });
  },
  delete: function(req, res){
    QuizModel.remove({_id: req.params.id}, function(err){
      res.json({success: true});
    });
  },
  addToHighscore: function(req, res){
    new HighscoreModel({
      quizId: req.body.quizId,
      questionsWrong: req.body.questionsWrong,
      questionsRight: req.body.questionsRight,
      questionsAnswered: req.body.questionsAnswered,
      questionsTotal: req.body.questionsTotal,
      username: req.body.username,
      score: req.body.score
    }).save(function(err, highscore){
      res.json(highscore);
    });
  },
  showToHighscore: function(req, res){
    HighscoreModel.findById(req.params.id, function(err, highscore){
      res.json(highscore);
    });
  },
  updateToHighscore: function(req,res){
    HighscoreModel.findById(req.params.id, function(err, highscore){
      highscore.quizId = req.body.username;
      highscore.questionsWrong = req.body.questionsWrong;
      highscore.questionsRight = req.body.questionsRight;
      highscore.questionsAnswered =  req.body.questionsAnswered;
      highscore.questionsTotal = req.body.questionsTotal;
      highscore.username =  req.body.username;
      highscore.score = req.body.score;
      highscore.save(function(err, highscore){
        res.json(highscore);
      });
    });
  },
  removeToHighscore: function(req, res){
    HighscoreModel.remove({_id: req.params.id}, function(err){
      res.json({success: true});
    });
  },
  addHighscore: function(req, res){
    QuizModel.findById(req.params.id, function(err, quiz){
      var highscore = new HighscoreModel({body: req.body.body});
      quiz.highscores.push(highscore);
      quiz.save(function(err, highscore){
        res.json(highscore);
      });
    });
  },
  removeHighscore: function(req, res){
    QuizModel.findByIdAndUpdate(req.params.quizId, {
      $pull:{
        highscores: {_id: req.params.id}
      }
    }, function(err, quiz){
      res.json(quiz);
    });
  },
  getHighscores: function(req, res){
    QuizModel.findById(req.params.id, function(err, quiz){
      res.json(quiz.highscores);
    });
  },
  allHighscores: function(req, res){
    HighscoreModel.find({}, function(err, highscores){
      res.json(highscores);
    });
  }


};
module.exports = router;
