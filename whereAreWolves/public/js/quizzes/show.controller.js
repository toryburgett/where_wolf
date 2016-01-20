"use strict";

(function(){
  angular
  .module("quizzes")
  .controller("QuizShowController", [
    "QuizFactory",
    "$stateParams",
    "$http",
    QuizShowControllerFunction
  ]);

  function QuizShowControllerFunction(QuizFactory, $stateParams, $http){
    var self = this;
    this.quiz = QuizFactory.get({_id: $stateParams._id});
    this.quizzes = QuizFactory.query(function(allQuizzes){
      self.quizUrlData = [];
      for(var i=0; i < allQuizzes.length; i++){
        var selectedQuiz = allQuizzes[i];
        if(selectedQuiz._id === $stateParams._id){
          var newQuizUrl = allQuizzes[i].githubgist;
          var newQuizUrlData = $http.get(newQuizUrl)
            .then(function successCallback(response) {
              self.quizUrlData.push(response.data);
              console.log(self.quizUrlData);
            }, function errorCallback(response) {
              console.log("error in http get, (show quizzes) "+response);
            });
        }
      }
      console.log(self.quizzes);
    });

  }
}());
