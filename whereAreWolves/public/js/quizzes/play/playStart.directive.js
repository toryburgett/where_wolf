"use strict";

(function(){
  angular
  .module("quizzes")
  .directive("playForm", [
    "HighscoreFactory",
    "QuizFactory",
    "$stateParams",
    "$scope",
    PlayDirectiveFunction
  ]);

  function PlayDirectiveFunction(HighscoreFactory, QuizFactory, $stateParams, $state){
    console.log("directive function")
    return{
      templateUrl: "js/quizzes/play/_form.html",
      replace: true,

      scope: {
        highscore: "=",

      },
      link: function(scope){
        scope.create = function(){
          scope.highscore.$save(function(response){
            $state.go("quizPlay({_id: quiz._id, questionsAnswered: highscore.questionsAnswered})", {}, {reload: true});
          });
        };
        scope.update = function(){
          scope.highscore.$update({id: scope.highscore._id}, function(response){
            console.log(response);
          });
        };
        scope.delete = function(){
          scope.highscore.$delete({id: scope.highscore._id}, function(){
            $state.go("quizIndex", {}, {reload: true});
          });
        };
      }
    };
  }
}());
