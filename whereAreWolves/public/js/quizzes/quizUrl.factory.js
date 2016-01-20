"use strict";

(function(){
  angular
  .module("quizzes")
  .factory("QuizUrlFactory", [
    "$stateParams",
    "QuizFactory",
    "$resource",
    QuizFactoryFunction
  ]);

  function QuizFactoryFunction($stateParams, QuizFactory, $resource){
    var self = this;
    this.quiz = QuizFactory.get({_id: $stateParams._id});
    // return $resource( (self.quiz.githubgist) , {}, {});





  }

}());
