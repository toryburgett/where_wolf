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
    new QuizModel({name: req.body.name}).save(function(err, quiz){
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
  }
};
module.exports = router;
