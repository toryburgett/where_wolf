"use strict";

(function(){
  angular
  .module("highscores")
  .controller("HighscoreIndexController", [
    "HighscoreFactory",
    "QuizFactory",
    "$location",
    "$anchorScroll",
    "$stateParams",
    "$http",
    HighscoreIndexControllerFunction
  ]);

  function HighscoreIndexControllerFunction(HighscoreFactory, QuizFactory, $location, $anchorScroll, $stateParams, $http){
    var self = this;
    this.quizHighscores = [];
    this.quizIds = [];

    this.quizzes = QuizFactory.query(function(quizData){
      self.allHighscores = HighscoreFactory.query();
    });

    if($stateParams._id){
      $location.hash($stateParams._id);
      $anchorScroll();
    }

  }
}());
