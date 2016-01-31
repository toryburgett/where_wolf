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
    "$anchorScrollProvider",
    RouterFunction
  ]);

  function RouterFunction($stateProvider){
    $stateProvider
    .state("welcomePage", {
      url: "",
      templateUrl: "js/siteInfo/welcome.html",
      controller: "QuizIndexController",
      controllerAs: "QuizIndexViewModel"
    })
    .state("welcomePageAgain", {
      url: "/",
      templateUrl: "js/siteInfo/welcome.html",
      controller: "QuizIndexController",
      controllerAs: "QuizIndexViewModel"
    })
    .state("aboutPage", {
      url: "/about",
      templateUrl: "js/siteInfo/about.html",
      controller: "QuizIndexController",
      controllerAs: "QuizIndexViewModel"
    })
    .state("contactPage", {
      url: "/contact",
      templateUrl: "js/siteInfo/contact.html",
      controller: "QuizIndexController",
      controllerAs: "QuizIndexViewModel"
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
      url: "/highscore/:_id",
      templateUrl: "js/quizzes/highscores/index.html",
      controller: "HighscoreIndexController",
      controllerAs: "HighscoreIndexViewModel"
    });
  }
}());
