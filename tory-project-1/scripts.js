$(document).ready(function(){
  //Hides the questions from the page loading
  $(".question").hide();
  $(".answerArea").hide();
  $(".refreshArea").hide();


  var questionCounter = 1;
  var answerCounter = 0;

  //Go through the questions
  $(".submitButton").on("click", function(){
    event.preventDefault();
    if (questionCounter === 1){
      $(".questionStart").hide();
      $("#question1").show();
      $(".answerArea").show();
    }
    else if (questionCounter < 4){
      $("#question"+(questionCounter-1)).hide();
      $("#question"+questionCounter).show();
    }
    else if (questionCounter === 4){
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
