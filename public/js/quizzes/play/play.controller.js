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
    this.selectedAnswerNumberFinal = 5;
    this.showUsername = false;
    this.showWarn = false;
    this.submitShow = true;

    this.highscore = HighscoreFactory.get({_id: $stateParams._id}, function(data){
      self.quizId = data.quizId;
      self.quizApi = QuizFactory.get({_id: data.quizId}, function(quizApiData){
        $http.get(quizApiData.githubgist)
          .then(function(response){
            self.quiz = response.data;
          }, function(response){
            console.log("Something went wrong"+response);
          });
      });
    });

    this.nextQuestion = function(){
      if(self.highscore.questionsAnswered == self.highscore.questionsTotal){
        self.showWarn = false;
        if(!(self.highscore.username)){
          self.highscore.username = "Anonymous Player";
        }
        self.quizApi.highscores.push(self.highscore);
        self.highscore.$update({_id: $stateParams._id});
        self.quizApi.$update({_id: self.highscore.quizId}, function(){
          $state.go("highscoreIndex", {_id: self.highscore._id}, { reload: true });
          // .then(function(){
          //   $state.go("#"+self.highscore._id, {}, {});
          // });
        });


      }else{
          // go to next question
          var num = self.highscore.questionsAnswered;
          var num2 = num + 1;
          self.highscore.questionsAnswered = num2;
          self.highscore.$update({_id: $stateParams._id});
          self.selectAnswerNumber = 5;
          self.submitShow = true;

          //show username field if questionsAnswered == questionsTotal
          if(self.highscore.questionsAnswered == self.highscore.questionsTotal){
            self.showUsername = true;
            self.submitShow = false;
          }
        }

      };

    this.submitAnswer = function(){
      self.selectedAnswerNumberFinal = self.selectAnswerNumber;
      // checkAnswer
      if (self.selectAnswerNumber == 5){
        self.showWarn = true;
      }else{
        self.showWarn = false;
        var questionNumber = self.highscore.questionsAnswered;
        if(self.selectAnswerNumber == self.quiz.quiz[questionNumber].correctAnswer){
          var numright = self.highscore.questionsRight;
          var numright2 = numright + 1;
          self.highscore.questionsRight = numright2;
          self.highscore.quizId = self.quizId;
          self.highscore.$update({_id: $stateParams._id});
        }else if (self.selectAnswerNumber !== self.quiz.quiz[questionNumber].correctAnswer) {
          var numwrong = self.highscore.questionsWrong;
          var numwrong2 = numwrong + 1;
          self.highscore.questionsWrong = numwrong2;
          self.highscore.quizId = self.quizId;
          self.highscore.$update({_id: $stateParams._id});
        }
        self.submitShow = false;
      }
    };


    this.selectAnswer = function(number){
      this.selectAnswerNumber = number;
    };

    this.selectedColor = function(number){
      if(self.submitShow === false){
        var questionNumber = self.highscore.questionsAnswered;
        if(self.selectedAnswerNumberFinal == number){
          if(self.quiz.quiz[questionNumber].correctAnswer == number){
            return "green";
          }else{
            return "red";
          }
        }else{
          if(self.quiz.quiz[questionNumber].correctAnswer == number){
            return "green";
          }else{
            return "teal";
          }
        }
      }else{
        if(self.selectAnswerNumber == number){
          return "deep-orange";
        }else{
          return "teal";
        }
      }


    };

    // this.optionAnswer = function(number){
    //   var questionNumber = self.highscore.questionsAnswered;
    //   if(self.selectAnswerNumber == number){
    //     if(self.quiz.quiz[questionNumber].correctAnswer == number){
    //       return "green";
    //     }else{
    //       return "red";
    //     }
    //   }
    //   else{
    //     if(self.quiz.quiz[questionNumber].correctAnswer == number){
    //       return "green";
    //     }else{
    //       return "teal";
    //     }
    //   }
    //
    // };




  }
}());
