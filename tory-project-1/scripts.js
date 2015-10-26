$(document).ready(function(){
  //Hides the questions from the page loading
  $(".question").hide();
  $("#question0").show();
  $(".answerArea").hide();
  $(".refreshButton").hide();
  $(".submitButton").hide();

  //Counts what question you are currently on, How many questions did you get right, how many questions have I made?
  var questionCounter = 1;
  var answerCounter = 0;
  var numOfQuestions = 3;

  //What should the color be for selected items vs items not selected
  var selectedColor = "rgb(255, 165, 0)";
  var unselectedColor = "rgb(255, 250, 205)";
  var rightAnswerColor = "green";
  var wrongAnswerColor = "red";

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
      }
      else if(answerType==="#multipleChoice"){
        $("#itsTrueFalse").hide();
        $("#multipleChoice").show();
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

        //Do not continue to track this...
        $(".submitButton").off("click");
      });
    }
  };

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
      //temp guide: answer to first=true, second=B, third=false.
      checkAnswer(1, "#itsTrueFalse", "#true");
      checkAnswer(2, "#multipleChoice", "#mcB");
      checkAnswer(3, "#itsTrueFalse", "#false");

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
    }
    questionCounter++;
  });
});
