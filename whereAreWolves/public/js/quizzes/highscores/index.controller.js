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
    this.quizzes = QuizFactory.query(function(data){
      console.log(data);
    });
    this.allHighscores = HighscoreFactory.query(function(data){
      console.log(data);
    });
  }
}());
