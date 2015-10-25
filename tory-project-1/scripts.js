$(document).ready(function(){
  //Hides the questions from the page loading
  $(".question").hide();
  $("#question0").show();
  $(".answerArea").hide();
  $(".refreshArea").hide();

  //Counts what question you are currently on
  var questionCounter = 1;
  //Counts how many questions you got right
  var answerCounter = 0;
  // How many questions have I made??????
  var numOfQuestions = 3;

  //only one choice is selected
  //
  $(".answerChoice").on("click", function(){
    if ($(this).css("background")!="rgb(255, 165, 0)"){
      //only one choice is selected
      $(".answerChoice").css("background", "rgb(255, 250, 205)");
      $(this).css("background", "rgb(255, 165, 0)");
    }
  });


  //failed attempts to hover and change color
  // var selectedColor;
  // var savedSelectedColor;
  // // //on hover, the answerChoices turn pink
  // $(".answerChoice").hover( function(){
  //   selectedColor = $(this).css("background");
  //   if ((selectedColor === "rgb(255, 165, 0)")||(selectedColor === "rgb(255, 250, 205)")){
  //     selectedColor = savedSelectedColor;
  //   }
  //   else {
  //     savedSelectedColor = "rgb(255, 250, 205)";
  //   }
  //   $(this).css("background", "rgb(255, 192, 203)");
  // }, function(){
  //   $(this).css("background", savedSelectedColor);
  //   console.log(this);
  // });


//   $(".answerChoice").hover( function(){
//     $(this).css("background", "rgb(255, 192, 203)");
//   }, function(){
//     $(this).css("background", "rgb(255, 165, 0)");
//     console.log(this);
//   });
// }




  // //on mouseover on answerChoice turn pink or rgb(255, 192, 203)
  // var selectedChoice;
  // var selectedChoiceBackground;
  // $(".answerChoice").mouseover(function(){
  //   if($(this).css("background")!= "rgb(255, 192, 203)"){
  //     selectedChoice = this;
  //     selectedChoiceBackground = $("selectedChoice").css("background");
  //   }
  //   $(this).css("background", "rgb(255, 192, 203)");
  // });
  // $(".answerChoice").mouseout(function(){
  //   if (selectedChoiceBackground==="rgb(255, 165, 0)"){
  //     $(this).css("background", "rgb(255, 165, 0)");
  //   }
  //   else if (selectedChoiceBackground==="rgb(255, 250, 205)"){
  //     $(this).css("background", "rgb(255, 250, 205)");
  //   }
  // });

  //   $("selectedChoice").css("background", "rgb(255, 192, 203)");
  // });

  // $(".answerChoice").on("mouseover", function(){
  //   if (selectedChoiceBackground === "rgb(255, 165, 0)"){
  //
  //     $(".answerChoice").css("background", "rgb(255, 250, 205)");
  //     $(this).css("background", "rgb(255, 165, 0)");
  //   }
  // });



  $(".submitButton").on("click", function(){
    event.preventDefault();
    if (questionCounter < (numOfQuestions+1)){
      $("#question"+(questionCounter-1)).hide();
      $("#question"+questionCounter).show();
      $(".answerArea").hide();
      //get into what answers to show, and how to grade the answers
      //temp guide: answer to first=true, second=B, third=false.
      if ((questionCounter===1)){
        $("#trueFalse").show();
        $("#true").on("click", function(){
          answerCounter++;
        });
      }
      else if ((questionCounter===2)) {
        $("#multipleChoice").show();
        $("#mcB").on("click", function(){
          answerCounter++;
        });
      }
      else if ((questionCounter===3)){
        $("#trueFalse").show();
        $("#false").on("click", function(){
          answerCounter++;
        });
      }

    }
    else if (questionCounter === (numOfQuestions+1)){
      $("#question"+(questionCounter-1)).hide();
      $(".answerArea").hide();
      $(".submitArea").hide();
      $(".questionStart").show();
      $(".refreshArea").show();
      $(".questionStart").text("Thank you for playing. You answered "+answerCounter+" out of "+(questionCounter-1)+" questions correctly.");
    }
    questionCounter++;
  });

  // var makeQuestion $(.questionArea).append()

});


//Go through the questions
// $(".submitButton").on("click", function(){
//   event.preventDefault();
//   if (questionCounter < 4){
//     $("#question"+questionCounter).hide();
//     $("#question"+(questionCounter+1)).show();
//     $(".answerArea").show();
//   }
//   else if (questionCounter > numOfQuestions+1){
//     $("#question"+(questionCounter-1)).hide();
//     $(".answerArea").hide();
//     $(".submitArea").hide();
//     $("#question0").show();
//     $(".refreshArea").show();
//     $(".questionStart").text("Thank you for playing. You answered "+answerCounter+" out of "+numOfQuestions+" questions correctly.");
//   }
