"use strict";

(function(){
  angular
  .module("play")
  .directive("playForm", [
    "HighscoreFactory",
    "QuizFactory",
    "$stateParams"
    "$state",
    PlayDirectiveFunction
  ]);

  function PlayDirectiveFunction(HighscoreFactory, QuizFactory, $stateParams, $state){
    return{
      templateUrl: "js/quizzes/play/play.html",
      scope: {
        play: "="
      },
      link: function(scope){
        scope.create = function(){
          scope.grumble.$save(function(response){
            $state.go("grumbleIndex", {}, {reload: true});
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
