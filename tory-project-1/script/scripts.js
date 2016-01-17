$(document).ready(function(){

  //ajax request to quiz database
  var quiz;
  var url = "https://gist.githubusercontent.com/toryburgett/71493221c7927a506592/raw/f9a653331edd2a4f74055730eda9e344d0077045/quiz.json";
  function getQuizQuestion(){
    $.ajax({
      url: url,
      type: "get",
      dataType: "json"
    }).done(function(response){
      console.log(response);
      quiz = response;
    });
  }
  getQuizQuestion();

//Hides elements from appearing
  $(".question").hide();
  $("#question0").show();
  $(".answerArea").hide();
  $(".refreshButton").hide();
  $(".submitButton").hide();
  $(".gloryArea").hide();
  $(".progressArea").hide();
  $(".timerArea").hide();




//Counts what question you are currently on, How many questions did you get right, how many questions have I made?, how many times have you played? What is the highest score?
//   var questionCounter = 1;
//   var answerCounter = 0;
//   var numOfQuestions;
//   var numTimesPlayed = 0;
//   var highScoreQ1 = 0;
//   var highScoreQ2 = 0;
//   var choosenQuiz;
//
//   // Timer Variables
//   var timeAllowed = 600;
//   var userScore = 0;
//
  //What should the color be for selected items vs items not selected
  var selectedColor = "rgb(255, 165, 0)";
  var unselectedColor = "rgb(255, 250, 205)";
  var rightAnswerColor = "rgb(152, 251, 152)";
  var wrongAnswerColor = "pink";
  var highScoreColor = "rgb(152, 251, 152)";
  var otherScoreColor = "rgb(128, 128, 128)";
  var submitButtonColor = "rgb(0, 255, 0)";

  //Blinking Button
  var fadeThis = function(someElement){
    $(someElement).on("click", function(){
      $(someElement).hide();
      $(someElement).stop();
      $(someElement).off("click");
    });
    $(someElement).fadeIn('slow', function () {
      fadeItOut();
    });
    function fadeItIn() {
      $(someElement).fadeTo('slow', 1, function () {
        fadeItOut();
      });
    }
    function fadeItOut() {
      $(someElement).fadeTo('slow', 0.5, function () {
        fadeItIn();
      });
    }
  };

  // //updates with how far you are in quiz
  // var updateProgressBar = function(){
  //   var progressHere = ((questionCounter-1)/numOfQuestions)*100;
  //   $(".progressMade").css("width", (progressHere)+"%");
  //   $(".progressToGo").css("width", (100-progressHere)+"%");
  // };


});
