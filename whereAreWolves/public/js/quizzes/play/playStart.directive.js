"use strict";

(function(){
  angular
  .module("quizzes")
  .directive("playForm", [
    "HighscoreFactory",
    "QuizFactory",
    "$stateParams",
    "$state",
    PlayDirectiveFunction
  ]);

  function PlayDirectiveFunction(HighscoreFactory, QuizFactory, $stateParams, $state){
    return{
      templateUrl: "js/quizzes/play/_form.html",
      scope: {
        highscore: "="
      },
      link: function(scope){
        scope.create = function(){
          scope.grumble.$save(function(response){
            $state.go("highscoreIndex", {}, {reload: true});
          });
        }
        scope.update = function(){
          scope.grumble.$update({id: scope.grumble.id}, function(response){
            console.log(response);
          });
        }
        scope.delete = function(){
          scope.grumble.$delete({id: scope.grumble.id}, function(){
            $state.go("grumbleIndex", {}, {reload: true});
          });
        }
      }
    }
  }
}());
