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
    this.quizzesData = [];
    this.quizzesApi = QuizFactory.query(function(data){
      for(var i=0; i < data.length; i++){
        $http.get(data[i].githubgist)
          .then(function(response) {
            self.quizzesData.push(response.data);
          }, function(response) {
          });
      }
    });
  }
}());
