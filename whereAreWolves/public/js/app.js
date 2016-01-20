"use strict";

(function(){
  angular
  .module("wherewolves", [
    "ui.router",
    "quizzes"
  ])
  .config([
    "$stateProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("welcomePage", {
      url: "",
      templateUrl: "js/welcome.html",
    })
    .state("quizIndex", {
      url: "/quiz",
      templateUrl: "js/quizzes/index.html",
      controller: "QuizIndexController",
      controllerAs: "QuizIndexViewModel"
    })
    .state("quizShow", {
      url: "/quiz/:_id",
      templateUrl: "js/quizzes/show.html",
      controller: "QuizShowController",
      controllerAs: "QuizShowViewModel"
    });
  }
}());
