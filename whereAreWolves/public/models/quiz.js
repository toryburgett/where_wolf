var Quiz = function(info){
  this.name = info.name;
  this._id = info._id;
  this.githubgist = info.githubgist;
  this.highscores = info.highscores;
};

Quiz.all = [];

Quiz.fetch = function() {
  var request = $.getJSON("/quizzes")
  .then(function(response) {
    for (var i = 0; i < response.length; i++) {
      Quiz.all.push(new Quiz(response[i]));
    }
  })
  .fail(function(response) {
    console.log("js failed to load");
  });
  return request;
};

Quiz.prototype = {
  fetchHighscores: function() {
    var url = "/quizzes/" + this.id + "/highscores";
    var request = $.getJSON(url)
    .then(function(response) {
      var highscores = [];
      for (var i = 0; i < response.length; i++) {
        highscores.push(new Highscore(response[i]));
      }
      return highscores;
    })
    .fail(function(repsonse) {
      console.log("js failed to load");
    });
    return request;
  },
};
