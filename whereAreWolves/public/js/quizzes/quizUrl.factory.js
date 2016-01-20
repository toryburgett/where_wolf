"use strict";

(function(){
  angular
  .module("quizzes")
  .factory("QuizUrlFactory", [
    "$resource",
    "$http",
    "$stateParams",
    "QuizFactory",
    "$scope",
    QuizFactoryFunction
  ]);

  function QuizFactoryFunction($resource, $http, $stateParams, $scope, QuizFactory){
    var self = this;
    this.quiz = QuizFactory.get({_id: $stateParams._id});
    $http.get(self.quiz.githubgist)
      .then(function(response) {
        $scope.quizArray = response.data.records;
      });
  }
}());
