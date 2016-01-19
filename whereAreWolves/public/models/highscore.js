var Highscore = function(info){
  this.score = info.score;
  this.username = info.username;
  this.quizId = info._quizId;
  this.id = info._id;
};

Highscore.create = function(info, quizId){
  var self = this;
  var url = "/quizzes/"+quizId+"/highscores";
  var request = $.ajax({
    url: url,
    method: "post",
    data: JSON.stringify(info),
    contentType: 'application/json'
  });
  return request;
};
