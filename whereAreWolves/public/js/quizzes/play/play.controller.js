"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("PlayController", [
    "HighscoreFactory",
    "QuizFactory",
    "$scope",
    "$stateParams",
    "$http",
    PlayControllerFunction
  ]);

  function PlayControllerFunction(HighscoreFactory, QuizFactory, $scope, $stateParams, $http){
    $scope._id = $stateParams._id;
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

    this.quiz;
    this.quizApi = QuizFactory.get({_id: $stateParams._id}, function(data){
      $http.get(data.githubgist)
        .then(function(response){
          self.quiz = response.data;
          // $scope.quiz.$index = $stateParams.quizQuestion;
          console.log(self.quiz);
        }, function(response){
          console.log("Something went wrong, "+response);
        });
    });
  }
}());
