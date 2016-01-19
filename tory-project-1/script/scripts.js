$(document).ready(function(){

  //hide quizGame
  $("#quizGame").hide();

  //ajax request to quiz database
  var quiz;
  var quizNum;
  var quizNumOn = 0;
  var url = "https://gist.githubusercontent.com/toryburgett/71493221c7927a506592/raw/11fdde44e37630f59cf72b4143d399eda2fa8d69/quiz.json";


  var playThisQuiz = function(num){
    $("#welcomeIndex").hide();
    $("#quizGame").show();
    console.log("hello!");
    $(".qTitle").html("<h1>"+quiz.quiz[num].questionTitle+"</h1>");
    $(".qText").html("<h1>"+quiz.quiz[num].questionText+"</h1>");
    quizNumOn ++;
    console.log("quizNumOn "+quizNumOn);
    $("#playQuiz").on("click", function(){
      playThisQuiz(quizNumOn);
    });
  };

  $.ajax({
    url: url,
    type: "get",
    dataType: "json",
    }).then(function(response){
      quiz = response;
      quizNum = quiz.length;

      console.log(quiz);

      $("#playQuiz").on("click", function(){
        playThisQuiz(quizNumOn);
      });

  });
});
