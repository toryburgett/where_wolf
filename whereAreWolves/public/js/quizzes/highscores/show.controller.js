"use strict";

(function(){
  angular
  .module("highscores")
  .controller("HighscoreShowController", [
    "HighscoreFactory",
    "$stateParams",
    "$http",
    HighscoreShowControllerFunction
  ]);

  function HighscoreShowControllerFunction(HighscoreFactory, $stateParams, $http){
    var self = this;
    this.quizHighscores = [];
    this.allHighscores = HighscoreFactory.query(function(data){
      for(var i = 0; i < data.length; i++){
        if( data[i].quizId === $stateParams._id){
          self.quizHighscores.push(data[i]);
          console.log(self.quizHighscores);
        }
      }
      console.log(data);
    });


// get({_id: $stateParams._id}, function(data){
//       console.log(data);
//     });

 // function(data){
 //      $http.get(data.githubgist)
 //        .then(function(response){
 //          self.quiz = response.data;
 //          console.log(self.quiz);
 //        }, function(response){
 //          console.log("Something went wrong, "+response);
 //        });
 //    });

  }
}());
