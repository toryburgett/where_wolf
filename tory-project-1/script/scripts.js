$(document).ready(function(){

  //variables
  var quiz;
  var quizNum;
  var quizNumOn;
  var answeredWrong;
  var answeredRight;
  var answerSelect = 4;
  var url = "https://gist.githubusercontent.com/toryburgett/71493221c7927a506592/raw/c866f01ade53151b001e9369eaf002a42591d45b/quiz.json";

  // show pages
  var welcomeIndexShow = function(){
    $("#welcomeIndex").show();
    $("#quizGame").hide();
    quizNumOn = 0;
    answeredWrong = 0;
    answeredRight = 0;
  };
  var quizGameShow = function(){
    $("#welcomeIndex").hide();
    $("#quizGame").show();
  };
  // toggle submit button until answer is selected
  var holdSubmit = function(){
    if(answerSelect === 4){
      $("#submit").hide();
      $("#wait").show();
      $(".optionTitle").css("background-color", "white");
    }else{
      $("#submit").show();
      $("#wait").hide();
    }
  };
  //render the question
  var newQuestionRender = function(quizQuest){
    $(".qTitle").html("<h1>"+quizQuest.questionTitle+"</h1>");
    $(".qText").html("<h1>"+quizQuest.questionText+"</h1>");
    optionsRender(quizQuest.options);
    quizNumOn ++;
    console.log("quizNumOn " + quizNumOn);
  };
  //render the option, create event listener for option
  var optionClickListen = function(num){
    $(".option"+num).off();
    $(".option"+num).on("click", function(){
      answerSelect = num;
      holdSubmit();
      $(".optionTitle").css("background-color", "white");
      $(".option"+num).css("background-color", "pink");
      console.log("answerSelect = " + answerSelect);
    });
  };
  var optionsRender = function(options){
    answerSelect = 4;
    holdSubmit();
    for(var i = 0; i < options.length; i++){
      $(".option"+ i).html("<h1>"+options[i]+"</h1>");
      optionClickListen(i);
    }
  };

  var checkAnswer = function(correctAnswer){
    if(correctAnswer === answerSelect){
      answeredRight ++;
      console.log("right - " + answeredRight);
    } else {
      answeredWrong ++;
      console.log("wrong - " + answeredWrong);
    }

  };




  var playThisQuiz = function(){
    if (quizNumOn === quiz.quiz.length){
      welcomeIndexShow();
    } else {
      quizGameShow();
      newQuestionRender(quiz.quiz[quizNumOn]);

      // checkAnswer(quiz.quiz[quizNumOn].correctAnswer);
      console.log(quiz.quiz[quizNumOn]);
      console.log("correctAnswer "+quiz.quiz[quizNumOn].correctAnswer);
    }
  };

  // ajax request to the quiz database
  welcomeIndexShow();
  $.ajax({ url: url, type: "get", dataType: "json",})
    .then(function(response){
    quiz = response;
    quizNum = quiz.length;
    console.log(quiz);
    $("#playQuiz").on("click", playThisQuiz);
    $("#submit").on("click", playThisQuiz);
  });
});
