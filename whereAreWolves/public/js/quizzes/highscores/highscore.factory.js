"use strict";

(function(){
  angular
  .module("highscores")
  .factory("HighscoreFactory", [
    "$resource",
    HighscoreFactoryFunction
  ]);

  function HighscoreFactoryFunction($resource){
    return $resource("http://where-wolf.herokuapp.com/highscores/:_id", {}, {
      update: {method: "PUT"}
    });
  }
}());
