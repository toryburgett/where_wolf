"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("QuizShowController", [
    "QuizFactory",
    "$stateParams",
    QuizShowControllerFunction
  ]);

  function QuizShowControllerFunction(QuizFactory, $stateParams){
    this.quiz = QuizFactory.get({_id: $stateParams._id});
  }
}());
