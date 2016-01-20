"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("QuizIndexController", [
    "QuizFactory",
    QuizIndexControllerFunction
  ]);

  function QuizIndexControllerFunction(QuizFactory){
    this.quizzes = QuizFactory.query();
    this.newQuiz = new QuizFactory();
  }
}());
