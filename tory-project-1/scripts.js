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

  // only one choice is selected
  $(".answerChoice").on("click", function(){
    if ($(this).css("background")!=selectedColor){
      $(".answerChoice").css("background", unselectedColor);
      $(this).css("background", selectedColor);
    }
  });

//When on the right question, check answer pulls up the right answerType and verifies that the correct answer has the right background color when submit is clicked
  var checkAnswer = function(questionNumber, answerType, correctAnswer){
    if (questionCounter===questionNumber){
      $(".answerArea").hide();
      $(answerType).show();
      $(".submitButton").show();

      $(".submitButton").on("click", function(){
        event.preventDefault();
        if ($(correctAnswer).css("background") == selectedColor){
          answerCounter++;
        }
        else{
          console.log("wrong answer");
        }
        // else if (($(correctAnswer).css("background")!=selectedColor)&&()) {
        //
        // }

        $(".nextArea").show();
      });
      // $(".submitArea").hide();

    }
  };


  $(".nextButton").on("click", function(){
    event.preventDefault();
    $(".nextButton").text("NEXT");
    if (questionCounter < (numOfQuestions+1)){
      console.log("questionCounter "+questionCounter);

      $(".nextButton").hide();
      $("#question"+(questionCounter-1)).hide();
      $("#question"+questionCounter).show();

      //get into what answers to show, and how to grade the answers
      //temp guide: answer to first=true, second=B, third=false.

    // if 



      checkAnswer(1, "#trueFalse", "#true");
      checkAnswer(2, "#multipleChoice", "#mcB");
      checkAnswer(3, "#trueFalse", "#false");

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