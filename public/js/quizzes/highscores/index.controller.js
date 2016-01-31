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
    this.quizzesData = [];


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

      for(var i=0; i < data.length; i++){
        $http.get(quizData[i].githubgist)
          .then(function(response) {
            self.quizzesData.push(response.data);
          }, function() {
          });
      }




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
