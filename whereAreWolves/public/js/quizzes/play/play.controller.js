"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("PlayController", [
    "HighscoreFactory",
    "QuizFactory",
    "$scope",
    "$stateParams",
    "$state",
    "$http",
    PlayControllerFunction
  ]);

  function PlayControllerFunction(HighscoreFactory, QuizFactory, $scope, $stateParams, $state, $http){
    var self = this;
    this.quiz;
    this.quizApi;

    this.highscore = HighscoreFactory.get({_id: $stateParams._id}, function(data){

    });


    // this.quizHighscores = [];
    // this.allHighscores = HighscoreFactory.query(function(data){
    //   for(var i = 0; i < data.length; i++){
    //     if( data[i].quizId === $stateParams._id){
    //       self.quizHighscores.push(data[i]);
    //       console.log(self.quizHighscores);
    //     }
    //   }
    //   console.log(data);
    // });
    //
    // this.quiz;
    // this.quizApi = QuizFactory.get({_id: $stateParams._id}, function(data){
    //   $http.get(data.githubgist)
    //     .then(function(response){
    //       self.quiz = response.data;
    //       console.log(self.quiz);
    //     }, function(response){
    //       console.log("Something went wrong, "+response);
    //     });
    // });
  }
}());
