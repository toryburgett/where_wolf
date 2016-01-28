"use strict";

(function(){
  angular
  .module("highscores")
  .controller("HighscoreIndexController", [
    "HighscoreFactory",
    "QuizFactory",
    "$http",
    HighscoreIndexControllerFunction
  ]);

  function HighscoreIndexControllerFunction(HighscoreFactory, QuizFactory, $http){
    var self = this;
    this.quizHighscores = [];
    this.quizIds = [];
    this.quizzes = QuizFactory.query(function(quizData){
      self.allHighscores = HighscoreFactory.query(function(highscoreData){

        for(var i=0; i<quizData.length; i++){
          self.quizIds.push(quizData[i]._id);
        }
        for(var x=0; i<highscoreData.length; i++){
          var selectedHighscoreQuizId = highscoreData[x].quizId;
          var quizIdNum = self.quizIds.indexOf(selectedHighscoreQuizId);
          console.log(quizIdNum);
          if(quizIdNum === -1){
            var quizInfo = {"quizId": quizData[i]._id, "highscores": []};
            quizInfo.highscores.push(highscoreData[x]);
            self.quizHighscores.push(quizInfo);
          }else{
            self.quizHighscores[quizIdNum].highscores.push(highscoreData[x])
          }
        }
        console.log(self.quizIds);
        console.log(quizData);
        console.log(highscoreData);
      });

    });

  }
}());
