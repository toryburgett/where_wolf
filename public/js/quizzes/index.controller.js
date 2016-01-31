"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("QuizIndexController", [
    "QuizFactory",
    "HighscoreFactory",
    "$http",
    QuizIndexControllerFunction
  ]);

  function QuizIndexControllerFunction(QuizFactory, HighscoreFactory, $http){
    var self = this;
    this.quizzesData = [];

    this.quizzesApi = QuizFactory.query(function(data){
      for(var i=0; i < data.length; i++){
        $http.get(data[i].githubgist)
          .then(function(response) {
            self.quizzesData.push(response.data);
          }, function() {
          });
      }
    });

    this.highscores = HighscoreFactory.query();
  }
}());
