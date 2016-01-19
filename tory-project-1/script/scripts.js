$(document).ready(function(){

  //variables
  var quiz;
  var quizNum;
  var quizNumOn;
  var url = "https://gist.githubusercontent.com/toryburgett/71493221c7927a506592/raw/11fdde44e37630f59cf72b4143d399eda2fa8d69/quiz.json";

  // show pages
  var welcomeIndexShow = function(){
    $("#welcomeIndex").show();
    $("#quizGame").hide();
    quizNumOn = 0;
  };
  var quizGameShow = function(){
    $("#welcomeIndex").hide();
    $("#quizGame").show();
  };
  var newQuestionRender = function(quizQuest){
    $(".qTitle").html("<h1>"+quizQuest.questionTitle+"</h1>");
    $(".qText").html("<h1>"+quizQuest.questionText+"</h1>");
    quizNumOn ++;
    console.log("quizNumOn " + quizNumOn);
  };


  var playThisQuiz = function(){
    if (quizNumOn === quiz.quiz.length){
      welcomeIndexShow();
    } else {
      quizGameShow();
      newQuestionRender(quiz.quiz[quizNumOn]);
    }
  };


  // ajax request to the quiz database
  welcomeIndexShow();
  $.ajax({
    url: url,
    type: "get",
    dataType: "json",
  }).then(function(response){
    quiz = response;
    quizNum = quiz.length;
    console.log(quiz);
    $("#playQuiz").on("click", playThisQuiz);
    $("#submit").on("click", playThisQuiz);
  });

});
