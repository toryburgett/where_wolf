"use strict";

(function(){
  angular
  .module("wherewolves", [
    "ui.router",
    "quizzes",
    "highscores",
    "play"
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
      url: "/play/:_id",
      templateUrl: "js/quizzes/play/play.html",
      controller: "PlayController",
      controllerAs: "PlayViewModel"
    })
    .state("quizHighscoreShow", {
      url: "/quiz/:_id/highscore",
      templateUrl: "js/quizzes/highscores/show.html",
      controller: "HighscoreShowController",
      controllerAs: "HighscoreShowViewModel"
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
      controller: "HighscoreIndexController",
      controllerAs: "HighscoreIndexViewModel"
    });
  }
}());
