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
    this.selectAnswerNumber = 5;
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
        $state.go("highscoreIndex");

      }else{
        var num = self.highscore.questionsAnswered;
        var num2 = num + 1;
        self.highscore.questionsAnswered = num2;
        self.highscore.$update({_id: $stateParams._id})
        self.selectAnswerNumber = 5;
        console.log(self.highscore);
      }
    };

    this.selectAnswer = function(number){
      this.selectAnswerNumber = number;
    }

    this.checkAnswer = function(){
      if (self.selectAnswerNumber == 5){
        console.log("choose an answer");
      }else{
        var questionNumber = self.highscore.questionsAnswered;
        if(self.selectAnswerNumber == self.quiz.quiz[questionNumber].correctAnswer){
          var numright = self.highscore.questionsRight;
          var numright2 = num + 1;
          self.highscore.questionsRight = numright2;
          self.highscore.$update({_id: $stateParams._id})
        }else if (self.selectAnswerNumber !== self.quiz.quiz[questionNumber].correctAnswer) {
          var numwrong = self.highscore.questionsWrong;
          var numwrong2 = num + 1;
          self.highscore.questionsWrong = numwrong2;
          self.highscore.$update({_id: $stateParams._id})
        }

      }
    }


  }
}());
