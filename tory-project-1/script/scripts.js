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
      buttonVisible("#wait", "#submit", "#next");
      $(".optionTitle").css("background-color", "white");
    }else{
      buttonVisible("#submit", "#next", "#wait");
    }
  };
  //show one button from submit area
  var buttonVisible = function(show, hide1, hide2){
    $(show).show();
    $(hide1).hide();
    $(hide2).hide();
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
  //check that the answer matches with correct one
  var checkAnswer = function(correctAnswer){
    if(correctAnswer == answerSelect){
      answeredRight ++;
    } else {
      answeredWrong ++;
    }
    console.log("total: right = "+answeredRight+" | wrong = "+answeredWrong);
    buttonVisible("#next", "#submit", "#wait");
  };

  var playThisQuiz = function(){
    if (quizNumOn === quiz.quiz.length){
      welcomeIndexShow();
    } else {
      quizGameShow();
      newQuestionRender(quiz.quiz[quizNumOn]);
      $("#submit").off();
      $("#submit").on("click", function(){
        checkAnswer(quiz.quiz[(quizNumOn-1)].correctAnswer);
      });
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
    $("#next").on("click", playThisQuiz);
  });
});
