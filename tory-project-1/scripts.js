$(document).ready(function(){

  //Quiz questions
  var question1 = {question: "Question 1, answer is 1", thetrue: "1", thefalse: "2", answerText: "Describing question1 answer"};
  var question2 = {question: "Question 2, answer is it's me", mcA: "not me", mcB: "it's me", mcC: "read these", mcD: "I give up", answerText: "Describing question2 answer"};
  var question3 = {question: "Question 3, answer is dogs", thetrue: "cats", thefalse: "dogs", answerText: "Describing question3 answer"};
  var question4 = {question: "Question 4, answer is Hello", thetrue: "Hello", thefalse: "Goodbye", answerText: "Describing question4 answer"};
  var question5 = {question: "Question 5, answer is A", mcA: "A Choice", mcB: "B Choice", mcC: "C Choice", mcD: "D Choice", answerText: "Describing question5 answer"};
  var question6 = {question: "Question 6, answer is Yes", thetrue: "Yes", thefalse: "No", answerText: "Describing question6 answer"};
  var question7 = {question: "Question 7, answer is True", thetrue: "True", thefalse: "False", answerText: "Describing question7 answer"};
  var question8 = {question: "Question 8, answer is C Choice", mcA: "A Choice", mcB: "B Choice", mcC: "C Choice", mcD: "D Choice", answerText: "Describing question8 answer"};
  var question9 = {question: "Question 9, answer is Yellow", thetrue: "Red", thefalse: "Yellow", answerText: "Describing question9 answer"};
  var question10 = {question: "Question 10, answer is B", thetrue: "A", thefalse: "B", answerText: "Describing question10 answer"};
  var theQuiz = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

  //Hides the questions from the page loading
  $(".question").hide();
  $("#question0").show();
  $(".answerArea").hide();
  $(".refreshButton").hide();
  $(".submitButton").hide();
  $(".gloryArea").hide();
  $(".progressArea").hide();

  //Counts what question you are currently on, How many questions did you get right, how many questions have I made?, how many times have you played? What is the highest score?
  var questionCounter = 1;
  var answerCounter = 0;
  var numOfQuestions = 10;
  var numTimesPlayed = 0;
  var highScore = 0;

  //What should the color be for selected items vs items not selected
  var selectedColor = "rgb(255, 165, 0)";
  var unselectedColor = "rgb(255, 250, 205)";
  var rightAnswerColor = "rgb(152, 251, 152)";
  var wrongAnswerColor = "pink";
  var highScoreColor = "rgb(152, 251, 152)";
  var otherScoreColor = "rgb(128, 128, 128)";
  var submitButtonColor = "rgb(0, 255, 0)";

  //create quiz questions divs
  for(i=0; i<(numOfQuestions+1); i++){
    if(i===0){
      $(".questionArea").append("<div class=\"questionStart\" id=\"question"+(i)+"\">Hello! Would you like to play a game?</div>");
    }
    else{
      $(".questionArea").append("<div class=\"question\" id=\"question"+(i)+"\"></div>");
    }
  }


  //Help from this website: <http://stackoverflow.com/questions/3451407/jquery-fadein-fadeout-repeatedly/3451505#3451505>
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


  //updates with how far you are in quiz
  var updateProgressBar = function(){
    var progressHere = ((questionCounter-1)/numOfQuestions)*100;
    $(".progressMade").css("width", (progressHere)+"%");
    $(".progressToGo").css("width", (100-progressHere)+"%");
  };

  //When on the right question, check answer pulls up the right answerType and verifies that the correct answer has the right background-color color when submit is clicked
  var checkAnswer = function(questionNumber, answerType, correctAnswer){
    if(questionCounter===questionNumber){
      // only one choice is selected
      $(".answerChoice").on("click", function(){
        if ($(this).css("background-color")!=selectedColor){
          $(".answerChoice").css("background-color", unselectedColor);
          $(this).css("background-color", selectedColor);
        }
        fadeThis(".submitButton");
        $(".submitButton").on("click", function(){
          $(".answerChoice").off("click");
        });
      });
      //Buttons - hide next show submit
      $(".nextButton").hide();
      $(".submitButton").show();
      $(".submitButton").css("opacity", 1);
      //Answers - hide, then show relevant answer answer
      if(answerType==="#itsTrueFalse"){
        $("#multipleChoice").hide();
        $("#itsTrueFalse").show();
        $("#question"+questionNumber).html("<p>"+theQuiz[questionNumber-1].question+"</p>");
        $("#true").html("<p>"+theQuiz[questionNumber-1].thetrue+"</p>");
        $("#false").html("<p>"+theQuiz[questionNumber-1].thefalse+"</p>");
      }
      else if(answerType==="#multipleChoice"){
        $("#itsTrueFalse").hide();
        $("#multipleChoice").show();
        $("#question"+questionNumber).html("<p>"+theQuiz[questionNumber-1].question+"</p>");
        $("#mcA").html("<p>"+theQuiz[questionNumber-1].mcA+"</p>");
        $("#mcB").html("<p>"+theQuiz[questionNumber-1].mcB+"</p>");
        $("#mcC").html("<p>"+theQuiz[questionNumber-1].mcC+"</p>");
        $("#mcD").html("<p>"+theQuiz[questionNumber-1].mcD+"</p>");
      }
      //add event listener for submit
      $(".submitButton").on("click", function(){
        event.preventDefault();
        //update Progress Bar
        updateProgressBar();
        //what is the correctAnswer's background-color color?
        var correctAnswerColor;
        correctAnswerColor = $(correctAnswer).css("background-color");
        //highlight right answerchange the color to make this color rightAnswerColor
        $(correctAnswer).css("background-color", rightAnswerColor);
        //does the correctAnswer have the right background-color?
        if(correctAnswerColor === selectedColor){
          answerCounter++;
          console.log("Question "+questionCounter+" right. AnswerCounter: "+answerCounter);
          $("#correctAnswer").show();
          $("#correctAnswer").html("<p> Correct! "+theQuiz[questionNumber-1].answerText+"</p>");
          $("#correctAnswer").css("border","3px solid "+rightAnswerColor);
        }
        else if(correctAnswerColor === unselectedColor){
          var showRightAnswerDescription = function(){
            $("#correctAnswer").show();
            $("#correctAnswer").html("<p>"+theQuiz[questionNumber-1].answerText+"</p>");
            $("#correctAnswer").css("border","3px solid "+wrongAnswerColor);
          };
          //make selected answer show up as wrong
          if ( (correctAnswer!="#true") && ($("#true").css("background-color") === selectedColor)){
            $("#true").css("background-color", wrongAnswerColor);
            showRightAnswerDescription();
          }
          else if ( (correctAnswer!="#false") && ($("#false").css("background-color") === selectedColor)){
            $("#false").css("background-color", wrongAnswerColor);
            showRightAnswerDescription();
          }
          else if ( (correctAnswer!="#mcA") && ($("#mcA").css("background-color") === selectedColor)){
            $("#mcA").css("background-color", wrongAnswerColor);
            showRightAnswerDescription();
          }
          else if ( (correctAnswer!="#mcB") && ($("#mcB").css("background-color") === selectedColor)){
            $("#mcB").css("background-color", wrongAnswerColor);
            showRightAnswerDescription();
          }
          else if ( (correctAnswer!="#mcC") && ($("#mcC").css("background-color") === selectedColor)){
            $("#mcC").css("background-color", wrongAnswerColor);
            showRightAnswerDescription();
          }
          else if ( (correctAnswer!="#mcD") && ($("#mcD").css("background-color") === selectedColor)){
            $("#mcD").css("background-color", wrongAnswerColor);
            showRightAnswerDescription();
          }
          console.log("Question "+questionCounter+" wrong. AnswerCounter: "+answerCounter);
        }
        $(".nextButton").show();
        $(".submitButton").hide();
        //Do not continue to track this event click...
        $(".submitButton").off("click");
      });
    }
  };

  // Creates the Hall of Glory, a kind of scoreboard
  var createHallOfGlory = function(){
    $(".gloryArea").show();
    var turnScore = ((answerCounter/numOfQuestions)*100);
    if(turnScore === 100){
      if (highScore !== 100){
        $(".hallOfGlory").find("span:contains( -- HIGH SCORE)").remove();
        $(".turnsOfGlory").css("background-color", otherScoreColor);
      }
      $(".hallOfGlory").prepend("<p class=\"turnsOfGlory\" id=\"game"+numTimesPlayed+"\" style=\"background-color: "+highScoreColor+"\">Game "+numTimesPlayed+" -- scored "+answerCounter+" out of "+numOfQuestions+" -- "+turnScore.toFixed(2)+"<span> -- Perfect Score! </span></p>");
      highScore = turnScore;
      console.log("turnScore"+turnScore);
      console.log("highScore"+highScore);
    }
    else if (((turnScore > highScore)&&(highScore===0))||(turnScore===highScore)){
      $(".hallOfGlory").prepend("<p class=\"turnsOfGlory\" id=\"game"+numTimesPlayed+"\" style=\"background-color: "+highScoreColor+"\">Game "+numTimesPlayed+" -- scored "+answerCounter+" out of "+numOfQuestions+" -- "+turnScore.toFixed(2)+"<span> -- HIGH SCORE</span></p>");
      highScore = turnScore;
      console.log("turnScore"+turnScore);
      console.log("highScore"+highScore);
    }
    else if (turnScore > highScore){
      $(".hallOfGlory").find("span:contains( -- HIGH SCORE)").remove();
      $(".turnsOfGlory").css("background-color", otherScoreColor);

      $(".hallOfGlory").prepend("<p class=\"turnsOfGlory\" id=\"game"+numTimesPlayed+"\" style=\"background-color: "+highScoreColor+"\">Game "+numTimesPlayed+" -- scored "+answerCounter+" out of "+numOfQuestions+" -- "+turnScore.toFixed(2)+"<span> -- HIGH SCORE</span></p>");
      highScore = turnScore;
      console.log("turnScore"+turnScore);
      console.log("highScore"+highScore);
    }
    else {
      $(".hallOfGlory").append("<p class=\"turnsOfGlory\" id=\"game"+numTimesPlayed+"\">Game "+numTimesPlayed+" -- scored "+answerCounter+" out of "+numOfQuestions+" -- "+turnScore.toFixed(2)+"</p>");
      console.log("turnScore"+turnScore);
      console.log("highScore"+highScore);
    }
  };

  //This is the meat of the script file
  //Brings the user to the right question
  $(".nextButton").on("click", function(){
    event.preventDefault();
    $(".nextButton").text("NEXT");
    if (questionCounter < (numOfQuestions+1)){
      //show the progressBar
      $(".progressArea").show();
      //hide answer answer
      $(".answerArea").hide();
      //show the correct question
      $("#question"+(questionCounter-1)).hide();
      $("#question"+questionCounter).show();
      //return default colors to answer choice
      $(".answerChoice").css("background-color", unselectedColor);
      //get into what answers to show, and how to grade the answers
      checkAnswer(1, "#itsTrueFalse", "#true");
      checkAnswer(2, "#multipleChoice", "#mcB");
      checkAnswer(3, "#itsTrueFalse", "#false");
      checkAnswer(4, "#itsTrueFalse", "#true");
      checkAnswer(5, "#multipleChoice", "#mcA");
      checkAnswer(6, "#itsTrueFalse", "#true");
      checkAnswer(7, "#itsTrueFalse", "#true");
      checkAnswer(8, "#multipleChoice", "#mcC");
      checkAnswer(9, "#itsTrueFalse", "#false");
      checkAnswer(10, "#itsTrueFalse", "#false");
    }
    else if (questionCounter === (numOfQuestions+1)){
      //Answers
      $(".answerArea").hide();
      //Buttons
      $(".nextButton").hide();
      $(".submitButton").hide();
      $(".refreshButton").show();
      //Questions
      $("#question"+(questionCounter-1)).hide();
      $(".questionStart").show();
      $(".questionStart").text("Thank you for playing. You answered "+answerCounter+" out of "+(questionCounter-1)+" questions correctly.");
      //hide progressBar
      $(".progressArea").hide();
      //Add one to numTimesPlayed
      numTimesPlayed++;
      //Create Hall of Glory
      createHallOfGlory();
      // Whhen you click on the refreshButton brings you to front page of quiz
      $(".refreshButton").on("click", function(){
        event.preventDefault();
        //Buttons
        $(".nextButton").show();
        $(".nextButton").text("START");
        $(".refreshButton").hide();
        //Questions
        $("#question0").show();
        $("#question0").text("Hello! Would you like to play a game?");
        // //Do not continue to track this event click...
        $(".refreshButton").off("click");
      });
      //Variables
      questionCounter = 0;
      answerCounter = 0;
    }
    questionCounter++;
  });
});
