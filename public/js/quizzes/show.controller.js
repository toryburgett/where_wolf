"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("QuizShowController", [
    "HighscoreFactory",
    "QuizFactory",
    "$scope",
    "$stateParams",
    "$state",
    "$http",
    QuizShowControllerFunction
  ]);

  function QuizShowControllerFunction(HighscoreFactory, QuizFactory, $scope, $stateParams, $state, $http){

    var self = this;

    this.quiz;
    this.highscore;
    var questionsTotal = 0;

    this.quizApi = QuizFactory.get({_id: $stateParams._id}, function(data){
      $http.get(data.githubgist)
        .then(function(response){
          self.quiz = response.data;
          questionsTotal = self.quiz.quiz.length;

          self.highscore = new HighscoreFactory({
            quizId: self.quizApi._id,
            questionsWrong: 0,
            questionsRight: 0,
            questionsAnswered: 0,
            questionsTotal: questionsTotal,
            username: "Anonymous Quiz Player",
            score: 0
          });

          self.create = function(){
            self.highscore.$save(function(data){
              $state.go("quizPlay", {_id: self.highscore._id}, {reload: true});
            });
          };
        }, function(response){
          console.log("Something went wrong, "+response);
        });
    });

  }
}());
