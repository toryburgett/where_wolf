$(document).ready(function(){

  //variables
  var quiz;
  var quizNum;
  var quizNumOn;
  var answeredWrong;
  var answeredRight;
  var calcProgress;
  var answerSelect = 4;
  var url = "https://gist.githubusercontent.com/toryburgett/71493221c7927a506592/raw/6f2e585b33cc93ffffadbc28888a9e0a5ae9d634/quiz.json";

  // show pages
  var welcomeIndexShow = function(){
    showVisible("#welcomeIndex","#quizGame", "#quizScore");
    quizNumOn = 0;
    answeredWrong = 0;
    answeredRight = 0;
    renderProgress();
  };
  //progressBar Area
  var renderProgress = function(){
    calcProgress = ((quizNumOn)/quizNum)*100;
    $("#progressDone").css("width", (calcProgress+"%"));
    $("#progressToGo").css("width", ((100-calcProgress)+"%"));
  };

  // toggle submit button until answer is selected
  var holdSubmit = function(){
    if(answerSelect === 4){
      showVisible("#wait", "#submit", "#next");
      $(".optionTitle").css("background-color", "white");
    }else{
      showVisible("#submit", "#next", "#wait");
    }
  };
  //show one
  var showVisible = function(show, hide1, hide2){
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
    // renderProgress();
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
  var checkAnswer = function(question){
    if(question.correctAnswer == answerSelect){
      answeredRight ++;
      renderAnswer("Correct! ", "lime", question);
    } else {
      answeredWrong ++;
      renderAnswer("Wrong, ", "pink", question);
    }
    $(".answerArea").show();
    showVisible("#next", "#submit", "#wait");
  };
  var renderAnswer = function(status, color, question){
    $(".answerExplanation").html(status+" "+question.answerExplained);
    $(".answerExplanation").css("background-color", color);
  };


  //Render final screen, show renderScore
  var renderScore = function(){
    showVisible("#quizScore", "#welcomeIndex", "#quizGame");
    $(".score").html("total: right = "+answeredRight+" | wrong = "+answeredWrong);
    $("#home").on("click", welcomeIndexShow);
  };

  // render a new question unless you have finished quiz
  var playThisQuiz = function(){
    $(".answerArea").hide();
    if (quizNumOn === quizNum){
      renderScore();
    } else {
      showVisible("#quizGame", "#welcomeIndex", "#quizScore");
      newQuestionRender(quiz.quiz[quizNumOn]);
      $("#submit").off();
      $("#submit").on("click", function(){
        renderProgress();
        checkAnswer(quiz.quiz[(quizNumOn-1)]);
      });
    }
  };

  // ajax request to the quiz database
  welcomeIndexShow();
  $.ajax({ url: url, type: "get", dataType: "json",})
    .then(function(response){
    quiz = response;
    quizNum = quiz.quiz.length;
    console.log(quiz);
    $("#playQuiz").on("click", playThisQuiz);
    $("#next").on("click", playThisQuiz);
  });
});
