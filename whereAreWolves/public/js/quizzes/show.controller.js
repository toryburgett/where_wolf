"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("QuizShowController", [
    "QuizFactory",
    "$stateParams",
    "$http",
    QuizShowControllerFunction
  ]);

  function QuizShowControllerFunction(QuizFactory, $stateParams, $http){
    var self = this;
    this.quiz;
    this.quizApi = QuizFactory.get({_id: $stateParams._id}, function(data){
      $http.get(data.githubgist)
        .then(function(response){
          self.quiz = response.data;
          console.log(self.quiz);
        }, function(response){
          console.log("Something went wrong, "+response);
        });
    });
  }
}());
