"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("QuizIndexController", [
    "QuizFactory",
    "$http",
    QuizIndexControllerFunction
  ]);

  function QuizIndexControllerFunction(QuizFactory, $http){
    var self = this;
    this.quizzes = QuizFactory.query(function(allQuizzes){
      self.quizUrl = [];
      self.quizUrlData = [];
      for(var i=0; i < allQuizzes.length; i++){
        var selectedQuiz = allQuizzes[i];
        var newQuizUrl = allQuizzes[i].githubgist;
        self.quizUrl.push(newQuizUrl);
        var newQuizUrlData = $http.get(newQuizUrl)
          .then(function successCallback(response) {
            self.quizUrlData.push(response.data);
            console.log(self.quizUrlData);
          }, function errorCallback(response) {
            console.log("error in http get"+response);
          });
      }
      console.log(self.quizzes);
    });

    // console.log(self.quizzes);

  }
}());
