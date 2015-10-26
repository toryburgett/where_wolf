$(document).ready(function(){
  //Hides the questions from the page loading
  $(".question").hide();
  $("#question0").show();
  $(".answerArea").hide();
  $(".refreshArea").hide();
  $(".submitArea").hide();

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


  var checkAnswer = function(questionNumber, answerType, correctAnswer){
    if (questionCounter===questionNumber){
      $(answerType).show();
      var finalAnswer = 0;
      // $(".answerChoice").on("click", function(){
      //   if ($(this).css("background")!=selectedColor){
      //     $(".answerChoice").css("background", unselectedColor);
      //     $(this).css("background", selectedColor);
      //   }
      // });
      $(correctAnswer).on("click", function(){
        if(finalAnswer===0){
          answerCounter++;
          finalAnswer = 1;
          console.log(answerCounter);
        }
        else if (finalAnswer===1){
          answerCounter--;
          finalAnswer = 0;
          console.log(answerCounter);
        }
      });
    }
  };


  // var checkAnswer = function(questionNumber, answerType, correctAnswer){
  //   if (questionCounter===questionNumber){
  //     $(answerType).show();
  //     var finalAnswer = 0;
  //     $(".answerChoice").on("click", function(){
  //       if(($(correctAnswer).css("background")===selectedColor) && (finalAnswer===0)){
  //         answerCounter++;
  //         finalAnswer = 1;
  //         console.log(answerCounter);
  //       }
  //       else if (($(correctAnswer).css("background") === unselectedColor) && (finalAnswer===1)){
  //         answerCounter--;
  //         finalAnswer = 0;
  //         console.log(answerCounter);
  //       }
  //     });
  //   }
  // };

  // var checkAnswer = function(questionNumber, answerType, correctAnswer){
  //   if ((questionCounter===questionNumber)){
  //     $(answerType).show();
  //     $(".nextButton").on("click", function(){
  //       event.preventDefault();
  //       if($(correctAnswer).css("background")===selectedColor){
  //         answerCounter++;
  //       }
  //     });
  //   }
  // };


  $(".nextButton").on("click", function(){
    event.preventDefault();
    $(".nextButton").text("NEXT");
    if (questionCounter < (numOfQuestions+1)){
      $(".nextArea").hide();
      $(".submitArea").show();
      $("#question"+(questionCounter-1)).hide();
      $("#question"+questionCounter).show();
      $(".answerArea").hide();

      $(".submitButton").on("click", function(){
        event.preventDefault();


        //get into what answers to show, and how to grade the answers
        //temp guide: answer to first=true, second=B, third=false.

        checkAnswer(1, "#trueFalse", "#true");
        checkAnswer(2, "#multipleChoice", "#mcB");
        checkAnswer(3, "#trueFalse", "#false");

        // if ((questionCounter===1)){
        //   $("#trueFalse").show();
        //   $("#true").on("click", function(){
        //     answerCounter++;
        //   });
        // }
        // else if ((questionCounter===2)) {
        //   $("#multipleChoice").show();
        //   $("#mcB").on("click", function(){
        //     answerCounter++;
        //   });
        // }
        // else if ((questionCounter===3)){
        //   $("#trueFalse").show();
        //   $("#false").on("click", function(){
        //     answerCounter++;
        //   });
        // }
      });
    }
    else if (questionCounter === (numOfQuestions+1)){
      $("#question"+(questionCounter-1)).hide();
      $(".answerArea").hide();
      $(".nextArea").hide();
      $(".questionStart").show();
      $(".refreshArea").show();
      $(".questionStart").text("Thank you for playing. You answered "+answerCounter+" out of "+(questionCounter-1)+" questions correctly.");
    }
    questionCounter++;
  });
});
