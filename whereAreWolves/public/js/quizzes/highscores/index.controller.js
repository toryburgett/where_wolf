"use strict";

(function(){
  angular
  .module("highscores")
  .controller("HighscoreIndexController", [
    "HighscoreFactory",
    "QuizFactory",
    "$http",
    HighscoreIndexControllerFunction
  ]);

  function HighscoreIndexControllerFunction(HighscoreFactory, QuizFactory, $http){
    var self = this;
    this.quizHighscores = [];
    this.quizIds = [];
    this.quizzes = QuizFactory.query(function(quizData){
      self.allHighscores = HighscoreFactory.query();
      console.log(self.quizzes);
    });

  }
}());
