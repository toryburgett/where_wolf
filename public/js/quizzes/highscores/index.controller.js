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
    this.showRestHigh = false;
    this.selectedHighScore = function(num){
      if(num === $stateParams._id){
        return "teal lighten-4";
      }
    };

    this.quizzes = QuizFactory.query(function(quizData){
      self.allHighscores = HighscoreFactory.query(function(){
        if($stateParams._id){
          self.showRestHigh = true;
          $location.hash($stateParams._id);
          $anchorScroll();
        }
      });
    });

    this.showAll = function(){
      if(self.showRestHigh === true){
        self.showRestHigh = false;
      }else{
        self.showRestHigh = true;
      }
    };



  }
}());
