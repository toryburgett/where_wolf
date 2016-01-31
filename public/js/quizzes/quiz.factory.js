"use strict";

(function(){
  angular
  .module("quizzes")
  .factory("QuizFactory", [
    "$resource",
    QuizFactoryFunction
  ]);

  function QuizFactoryFunction($resource){
    // return $resource("http://localhost:8080/quizzes/:_id", {}, {
    //   update: {method: "PUT"}
    // });

    // return $resource("http://where-wolf.herokuapp.com/quizzes/:_id", {}, {
    //   update: {method: "PUT"}
    // });
  }
}());
