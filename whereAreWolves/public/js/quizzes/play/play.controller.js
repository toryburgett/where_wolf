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
    this.quizId;
    this.quizApi;
    this.selectAnswerNumber = 5;
    this.showUsername = false;

    this.highscore = HighscoreFactory.get({_id: $stateParams._id}, function(data){
      self.quizId = data.quizId;
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
        // //update score
        // var numrightfinal = self.highscore.questionsAnswered;
        // var numquestionstotal = self.highscore.questionsTotal;
        // var scorefinal = (numrightfinal/numquestionstotal);
        // self.highscore.score = scorefinal;
        // console.log(scorefinal);

        self.quiz.highscores.push(self.highscore);


        self.highscore.$update({_id: $stateParams._id});
        self.quiz.$update({_id: self.highscore.quizId});
        console.log(self.highscore);
        $state.go("highscoreIndex");

      }else{

        // checkAnswer
        if (self.selectAnswerNumber == 5){
          console.log("choose an answer");
        }else{
          var questionNumber = self.highscore.questionsAnswered;
          if(self.selectAnswerNumber == self.quiz.quiz[questionNumber].correctAnswer){
            var numright = self.highscore.questionsRight;
            var numright2 = numright + 1;
            self.highscore.questionsRight = numright2;
            self.highscore.quizId = self.quizId;
            self.highscore.$update({_id: $stateParams._id});
            console.log(self.highscore.questionsRight);
            console.log(self.highscore);
          }else if (self.selectAnswerNumber !== self.quiz.quiz[questionNumber].correctAnswer) {
            var numwrong = self.highscore.questionsWrong;
            var numwrong2 = numwrong + 1;
            self.highscore.questionsWrong = numwrong2;
            self.highscore.quizId = self.quizId;
            self.highscore.$update({_id: $stateParams._id});
            console.log(self.highscore.questionsWrong);
            console.log(self.highscore);
          }

          // go to next question
          var num = self.highscore.questionsAnswered;
          var num2 = num + 1;
          self.highscore.questionsAnswered = num2;
          self.highscore.$update({_id: $stateParams._id});
          self.selectAnswerNumber = 5;
          console.log(self.highscore);

          //show username field if questionsAnswered == questionsTotal
          if(self.highscore.questionsAnswered == self.highscore.questionsTotal){
            self.showUsername = true;
          }

        }

      }
    };

    this.selectAnswer = function(number){
      this.selectAnswerNumber = number;
      console.log(this.selectAnswerNumber);
    };

  }
}());
