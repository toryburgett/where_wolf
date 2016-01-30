"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("PlayStartController", [
    "HighscoreFactory",
    "QuizFactory",
    "$scope",
    "$stateParams",
    "$state",
    "$http",
    PlayStartControllerFunction
  ]);

  function PlayStartControllerFunction(HighscoreFactory, QuizFactory, $scope, $stateParams, $state, $http){
    var self = this;
    // this.quizHighscores = [];
    // console.log($stateParams._id);
    // this.allHighscores = HighscoreFactory.query(function(data){
    //   for(var i = 0; i < data.length; i++){
    //     console.log(data[i].quizId);
    //     if( data[i].quizId == $stateParams._id){
    //       self.quizHighscores.push(data[i]);
    //       console.log(self.quizHighscores);
    //     }else{
    //       console.log("something went wrong");
    //     }
    //   }
    //   console.log(data);
    // });



    this.quiz;
    this.highscore;
    var questionsTotal = 0;
    this.quizApi = QuizFactory.get({_id: $stateParams._id}, function(data){
      $http.get(data.githubgist)
        .then(function(response){
          self.quiz = response.data;
          questionsTotal = self.quiz.quiz.length;

          self.highscore = new HighscoreFactory({
            quizId: self.quizApi._id,
            questionsWrong: 0,
            questionsRight: 0,
            questionsAnswered: 0,
            questionsTotal: questionsTotal,
            username: "username",
            score: 0
          });

          self.create = function(){
            self.highscore.$save(function(data){
              console.log(data);
              self.quizApi.highscores.push(self.highscore);
              self.quizApi.$update({_id: $stateParams._id}, function(data){
                console.log(self.quizApi)
              });
              $state.go("highscoreIndex", {}, {reload: true});
            });
          };
          console.log(self.quiz);
        }, function(response){
          console.log("Something went wrong, "+response);
        });
    });




  }
}());
