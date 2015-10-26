$(document).ready(function(){

  //Quiz questions
  var question1 = {question: "What year is it?", thetrue: "2015", thefalse: "2095, YOURS TRULY"};
  var question2 = {question: "What is right?", mcA: "not me", mcB: "it's me", mcC: "read these", mcD: "I give up"};
  var question3 = {question: "Mmmmm watcha say? That it's \"all for the best\"?", thetrue: "Is that a song?", thefalse: "Of course it is"};
  var question4 = {question: "True False, the answer is true", thetrue: "True", thefalse: "False"};
  var question5 = {question: "MC Choice, answer is A", mcA: "A Choice", mcB: "B Choice", mcC: "C Choice", mcD: "D Choice"};
  var question6 = {question: "True False, the answer is true", thetrue: "True", thefalse: "False"};
  var question7 = {question: "True False, the answer is true", thetrue: "True", thefalse: "False"};
  var question8 = {question: "MC Choice, answer is C", mcA: "A -- Choice", mcB: "B Choice", mcC: "C Choice", mcD: "D Choice"};
  var question9 = {question: "True False, the answer is false", thetrue: "True", thefalse: "False"};
  var question10 = {question: "True False, the answer is false", thetrue: "True", thefalse: "False"};
  var theQuiz = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];

  //Hides the questions from the page loading
  $(".question").hide();
  $("#question0").show();
  $(".answerArea").hide();
  $(".refreshButton").hide();
  $(".submitButton").hide();
  $(".gloryArea").hide();

  //Counts what question you are currently on, How many questions did you get right, how many questions have I made?, how many times have you played? What is the highest score?
  var questionCounter = 1;
  var answerCounter = 0;
  var numOfQuestions = 10;
  var numTimesPlayed = 0;
  var highScore = 0;

  //What should the color be for selected items vs items not selected
  var selectedColor = "rgb(255, 165, 0)";
  var unselectedColor = "rgb(255, 250, 205)";
  var rightAnswerColor = "palegreen";
  var wrongAnswerColor = "pink";
  var highScoreColor = "rgb(0, 255, 0)";
  var otherScoreColor = "rgb(255,255,255)";

  for(i=0; i<numOfQuestions; i++){
    if(i===0){
      $(".questionArea").append("<div class=\"questionStart\" id=\"question"+(i)+"\">Hello! Would you like to play a game?</div>");
    }
    else{
      $(".questionArea").append("<div class=\"question\" id=\"question"+(i)+"\"></div>");
    }
  }

  // only one choice is selected
  $(".answerChoice").on("click", function(){
    if ($(this).css("background-color")!=selectedColor){
      $(".answerChoice").css("background-color", unselectedColor);
      $(this).css("background-color", selectedColor);
    }
  });

  //When on the right question, check answer pulls up the right answerType and verifies that the correct answer has the right background-color color when submit is clicked
  var checkAnswer = function(questionNumber, answerType, correctAnswer){
    if(questionCounter===questionNumber){
      //Buttons - hide next show submit
      $(".nextButton").hide();
      $(".submitButton").show();
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
        //what is the correctAnswer's background-color color?
        var correctAnswerColor;
        correctAnswerColor = $(correctAnswer).css("background-color");
        //highlight right answerchange the color to make this color rightAnswerColor
        $(correctAnswer).css("background-color", rightAnswerColor);
        //does the correctAnswer have the right background-color?
        if(correctAnswerColor === selectedColor){
          answerCounter++;
          console.log("Question "+questionCounter+" right. AnswerCounter: "+answerCounter);
        }
        else if(correctAnswerColor === unselectedColor){
          //make selected answer show up as wrong
          if ( (correctAnswer!="#true") && ($("#true").css("background-color") === selectedColor)){
            $("#true").css("background-color", wrongAnswerColor);
          }
          else if ( (correctAnswer!="#false") && ($("#false").css("background-color") === selectedColor)){
            $("#false").css("background-color", wrongAnswerColor);
          }
          else if ( (correctAnswer!="#mcA") && ($("#mcA").css("background-color") === selectedColor)){
            $("#mcA").css("background-color", wrongAnswerColor);
          }
          else if ( (correctAnswer!="#mcB") && ($("#mcB").css("background-color") === selectedColor)){
            $("#mcB").css("background-color", wrongAnswerColor);
          }
          else if ( (correctAnswer!="#mcC") && ($("#mcC").css("background-color") === selectedColor)){
            $("#mcC").css("background-color", wrongAnswerColor);
          }
          else if ( (correctAnswer!="#mcD") && ($("#mcD").css("background-color") === selectedColor)){
            $("#mcD").css("background-color", wrongAnswerColor);
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
