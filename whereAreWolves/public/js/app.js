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
      templateUrl: "js/siteInfo/welcome.html",
    })
    .state("welcomePageAgain", {
      url: "/",
      templateUrl: "js/siteInfo/welcome.html",
    })
    .state("aboutPage", {
      url: "/about",
      templateUrl: "js/siteInfo/about.html",
    })
    .state("contactPage", {
      url: "/contact",
      templateUrl: "js/siteInfo/contact.html",
    })
    .state("quizIndex", {
      url: "/quiz",
      templateUrl: "js/quizzes/index.html",
      controller: "QuizIndexController",
      controllerAs: "QuizIndexViewModel"
    })
    .state("quizPlay", {
      url: "/quiz/:_id/play",
      templateUrl: "js/quizzes/play.html",
      controller: "QuizShowController",
      controllerAs: "QuizPlayViewModel"
    })
    .state("quizHighscoreShow", {
      url: "/quiz/:_id/highscore",
      templateUrl: "js/quizzes/highscores/show.html",
      controller: "QuizShowController",
      controllerAs: "QuizHighscoreShowViewModel"
    })
    .state("quizShow", {
      url: "/quiz/:_id",
      templateUrl: "js/quizzes/show.html",
      controller: "QuizShowController",
      controllerAs: "QuizShowViewModel"
    })
    .state("highscoreIndex", {
      url: "/highscore",
      templateUrl: "js/quizzes/highscores/index.html",
      controller: "QuizIndexController",
      controllerAs: "HighscoreIndexViewModel"
    });
  }
}());
