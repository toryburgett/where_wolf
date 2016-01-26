"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("PlayController", [
    "HighscoreFactory",
    "QuizFactory",
    "$scope",
    "$stateParams",
    "$state",
    "$http",
    PlayControllerFunction
  ]);

  function PlayControllerFunction(HighscoreFactory, QuizFactory, $scope, $stateParams, $state, $http){
    var self = this;
    this.quiz;
    this.quizApi;
    // this.nextQuestion;

    this.highscore = HighscoreFactory.get({_id: $stateParams._id}, function(data){
      self.quizApi = QuizFactory.get({_id: data.quizId}, function(quizApiData){
        $http.get(quizApiData.githubgist)
          .then(function(response){
            self.quiz = response.data;
            console.log(self.quiz);
            console.log(self.quizApi);
            console.log(self.highscore);
          }, function(response){
            console.log("Something went wrong"+response);
          });
      });
    });

    this.nextQuestion = function(){
      if(self.highscore.questionsAnswered == self.highscore.questionsTotal){
        // Reached the end of the quiz, go to end page
        $state.go("highscoreIndex");

      }else if((self.highscore.questionsAnswered)%2==0){
        var num = self.highscore.questionsAnswered;
        var num2 = num + 1;
        self.highscore.questionsAnswered = num2;
        self.highscore.$update({_id: $stateParams._id})
        console.log(self.highscore);
        $state.go("quizPlay", {_id: self.highscore._id}, {reload: true});
      }else if((self.highscore.questionsAnswered)%2!==0){
        var num = self.highscore.questionsAnswered;
        var num2 = num + 1;
        self.highscore.questionsAnswered = num2;
        self.highscore.$update({_id: $stateParams._id})
        console.log(self.highscore);
        $state.go("quizPlaySecond", {_id: self.highscore._id}, {reload: true});
      }

    };


  }
}());
