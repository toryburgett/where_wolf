"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("PlayController", [
    "HighscoreFactory",
    "$stateParams",
    "$http",
    PlayControllerFunction
  ]);

  function PlayControllerFunction(HighscoreFactory, $stateParams, $http){
    var self = this;
    this.quizHighscores = [];
    this.allHighscores = HighscoreFactory.query(function(data){
      for(var i = 0; i < data.length; i++){
        if( data[i].quizId === $stateParams._id){
          self.quizHighscores.push(data[i]);
          console.log(self.quizHighscores);
        }
      }
      console.log(data);
    });
  }
}());
