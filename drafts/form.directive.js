"use strict";

(function(){
  angular
  .module("quizzes")
  .directive("quizForm", [
    "QuizFactory",
    "$state",
    QuizFormDirectiveFunction
  ]);

  function QuizFormDirectiveFunction(QuizFactory, $state){
    return{
      templateUrl: "js/quizzes/form.html",
      scope: {
        quiz: "="
      },
      link: function(scope){
        scope.create = function(){
          scope.quiz.$save(function(response){
            $state.go("quizIndex", {}, {reload: true});
          });
        };
        scope.update = function(){
          scope.quiz.$update({id: scope.quiz.id}, function(response){
            console.log(response);
          });
        };
        scope.delete = function(){
          scope.quiz.$delete({id: scope.quiz.id}, function(){
            $state.go("quizIndex", {}, {reload: true});
          });
        };
      }
    };
  }
}());
