$(document).ready(function(){
  var question1;
  var question2;
  var question3;
  var question4;
  var question5;
  var question6;
  var question7;
  var question8;
  var question9;
  var question10;
  var theQuiz;

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
  var questionCounter = 1;
  var answerCounter = 0;
  var numOfQuestions;
  var numTimesPlayed = 0;
  var highScore = 0;
  var choosenQuiz;

  // Timer Variables
  var timeAllowed = 600;
  var userScore = 0;

  //What should the color be for selected items vs items not selected
  var selectedColor = "rgb(255, 165, 0)";
  var unselectedColor = "rgb(255, 250, 205)";
  var rightAnswerColor = "rgb(152, 251, 152)";
  var wrongAnswerColor = "pink";
  var highScoreColor = "rgb(152, 251, 152)";
  var otherScoreColor = "rgb(128, 128, 128)";
  var submitButtonColor = "rgb(0, 255, 0)";

$(".questionArea").append("<div class=\"questionStart\" id=\"question0\">Hello! Would you like to play a game?</div>");

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
          $("#correctAnswer").html("<p style=\"color:"+rightAnswerColor+"\">Correct!</p> "+theQuiz[questionNumber-1].answerText);
          $("#correctAnswer").css("border","3px solid "+rightAnswerColor);
        }
        else if(correctAnswerColor === unselectedColor){
          var showRightAnswerDescription = function(){
            $("#correctAnswer").show();
            $("#correctAnswer").html("<p style=\"color: "+wrongAnswerColor+"\">Wrong</p>"+theQuiz[questionNumber-1].answerText);
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
          else{
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
      $(".hallOfGlory").prepend("<p class=\"turnsOfGlory\" id=\"game"+numTimesPlayed+"\" style=\"background-color: "+highScoreColor+"\">Quiz "+choosenQuiz+",Game "+numTimesPlayed+" -- scored "+answerCounter+" out of "+numOfQuestions+" -- "+turnScore.toFixed(2)+"<span> -- Perfect Score! </span></p>");
      highScore = turnScore;
      console.log("turnScore"+turnScore);
      console.log("highScore"+highScore);
    }
    else if (((turnScore > highScore)&&(highScore===0))||(turnScore===highScore)){
      $(".hallOfGlory").prepend("<p class=\"turnsOfGlory\" id=\"game"+numTimesPlayed+"\" style=\"background-color: "+highScoreColor+"\">Quiz "+choosenQuiz+",Game "+numTimesPlayed+" -- scored "+answerCounter+" out of "+numOfQuestions+" -- "+turnScore.toFixed(2)+"<span> -- HIGH SCORE</span></p>");
      highScore = turnScore;
      console.log("turnScore"+turnScore);
      console.log("highScore"+highScore);
    }
    else if (turnScore > highScore){
      $(".hallOfGlory").find("span:contains( -- HIGH SCORE)").remove();
      $(".turnsOfGlory").css("background-color", otherScoreColor);

      $(".hallOfGlory").prepend("<p class=\"turnsOfGlory\" id=\"game"+numTimesPlayed+"\" style=\"background-color: "+highScoreColor+"\">Quiz "+choosenQuiz+",Game "+numTimesPlayed+" -- scored "+answerCounter+" out of "+numOfQuestions+" -- "+turnScore.toFixed(2)+"<span> -- HIGH SCORE</span></p>");
      highScore = turnScore;
      console.log("turnScore"+turnScore);
      console.log("highScore"+highScore);
    }
    else {
      $(".hallOfGlory").append("<p class=\"turnsOfGlory\" id=\"game"+numTimesPlayed+"\">Quiz "+choosenQuiz+",Game "+numTimesPlayed+" -- scored "+answerCounter+" out of "+numOfQuestions+" -- "+turnScore.toFixed(2)+"</p>");
      console.log("turnScore"+turnScore);
      console.log("highScore"+highScore);
    }
  };

  //This is the meat of the script file
  //Brings the user to the right question
  $(".nextButton").on("click", function(){
    //HEY, to play you have to choose a quiz. Some people.
    if(($(".quiz1").prop("checked")===false)&&(($(".quiz2").prop("checked")===false))){
      $(".quizChoicesText").text("Hi! Please choose a quiz, and then hit start to begin");
    }
    else{
      //create quiz questions divs
      //choose quiz1
      if(($(".quiz1").prop("checked")===true)&&(($(".quiz2").prop("checked")===false))){
        //Quiz 1 questions
        question1 = {question: "Aretaeus of Cappadocia, an ancient Greek physician from the first century CE, recomended which of the following cures for a headache?", thetrue: "Setting the head on fire.", thefalse: "Digesting mercury tablets", answerText: "<img src=\"http://static.www.bmj.com/sites/default/files/highwire/bmj/325/7356/149.1/embed/graphic-1.gif\" style=\"width: 100px; height: 100px; float:left; margin: 0px 10px 20px 10px\"><p>Aretaeus recommended setting your head on fire to cure a headache. <a href=\"http://mentalfloss.com/article/52689/5-bizarre-and-scary-historical-headache-cures\" target=\"_blank\">source:MentalFloss</a></p>"};
        question2 = {question: "Which of the following presidents has appeared on a US paper bill?", mcA: "George H. W. Bush", mcB: "William McKinley", mcC: "James Buchanan", mcD: "James K. Polk", answerText: "<img src=\"http://a9.vietbao.vn/images/vi955/2013/1/55516176-1358331277-nhin-lai-dong-usd-giakhung5.jpg\" style=\"width: 250px; height: 205px; float:left; margin: 0px 10px 20px 10px\"><p>William McKinley appeared on the $500 US bill, first printed in 1928. Don't expect to find one anytime soon, as most of the $500 McKinley bills and other \"high-denomination\" bills are in museums or private collections. <a href=\"http://mentalfloss.com/article/23692/100000-bill-story-behind-large-denomination-currency\" target=\"_blank\">source:MentalFloss</a></p>"};
        question3 = {question: "True or False: The last time a Republican was elected president without a Nixon or Bush on the ticket was 1928", thetrue: "True", thefalse: "False", answerText: "<img src=\"http://static2.quoteswave.com/wp-content/uploads/2012/12/Herbert-Hoover-150x150.jpg\" style=\"float:left; margin: 0px 10px 20px 10px\"><p>The answer is true! The last Republican US President that was elected without a Nixon or Bush on the ticket was Herbert Hoover.<a href=\"http://www.politifact.com/wisconsin/statements/2015/jan/26/tweets/it-true-republicans-havent-won-presidential-race-1/\" target=\"_blank\">source:PolitiFact</a></p>"};
        question4 = {question: "True or False: During the US Civil War there were approximatley 310,000 deaths.", thetrue: "True", thefalse: "False", answerText: "<img src=\"http://firstpresbyterian.org/sites/default/files/styles/event_image__125x125_/public/Abraham-Lincoln-Event.jpg?itok=4665NQqw\" style=\"float:left; margin: 0px 10px 20px 10px\"><p>Historians estimate that there were at least 620,000 soldiers died as a result of the Civil War.<a href=\"http://www.civilwar.org/education/history/faq/?referrer=https://www.google.com/\" target=\"_blank\">source:CivilWar.org</a></p>"};
        question5 = {question: "Question 5: Who was given a key to the city of Detroit?", mcA: "The Dalai Lama", mcB: "Nick Cage", mcC: "Saddam Hussein", mcD: "Tony Blair", answerText: "<img src=\"http://theawesomestbattle.com/includes/thumbnail_resize.php?width=125&height=155&cropratio=1:1&image=//pictures/items/y4e4e8a5e_1367286128.jpg\" style=\"float:left; margin: 0px 10px 20px 10px\"><p>In 1980 Saddam Hussein was given the key to Detroit. <a href=\"http://www.cbsnews.com/news/guess-who-got-the-key-to-detroit/\" target=\"_blank\">source: CBS</a></p>"};
        question6 = {question: "True or False: Pope Gregory IX had it publically known that he did not like cats.", thetrue: "True", thefalse: "False", answerText: "<img src=\"https://d4cd7bf69c0420a9d289-8d620a1f27280186b617db3a1348f26d.ssl.cf2.rackcdn.com/1359-black-cat.jpg\" style=\"float:left; margin: 0px 10px 20px 10px\"><p> How did Gregory IX feel about cats? Well, the cat was out of the bag when he puplished his opinion that cats were associated with devil worship. <a href=\"https://en.wikipedia.org/wiki/Pope_Gregory_IX\" target=\"_blank\">source:Wikipedia</a></p>"};
        question7 = {question: "Before he became pope, Pius II published which kind of scandalous book?", thetrue: "Passionate Erotica", thefalse: "Detailed Anatomy Textbook", answerText: "<img src=\"http://skepticism-images.s3-website-us-east-1.amazonaws.com/images/jreviews/Pope-Pius-II-c.jpg\" style=\"float:left; width: 125px; height: 125px; margin: 0px 10px 20px 10px\"><p> Before he became pope, Pius II published an erotic book, \"The Tale of Two Lovers\". 3.5 stars on <a href=\"http://www.goodreads.com/book/show/3958435-the-tale-of-the-two-lovers\">goodreads.com</a>. <a href=\"https://books.google.com/books?id=8N8gH0f6-YAC&printsec=frontcover&dq=the+tale+of+two+lovers&hl=en&sa=X&ei=7IYwU_GrG8iIrgHPzYDwBA#v=onepage&q&f=false\" target=\"_blank\">source:GoogleBooks</a></p>"};
        question8 = {question: "Which other US president inspired the toy companies to try and recreate the sucess of Teddy Roosevelt's \"Teddy Bear?\"", mcA: "Herbert Hoover's \"Herbie's Chicks\"", mcB: "Harry S. Truman's \"Harry's Racoon\"", mcC: "William Taft’s \"Billy Possum\"", mcD: "Richard Nixon's \"Dickie's Skunk\"", answerText: "<img src=\"http://cdn.attackofthecute.com/May-04-2012-15-33-35-wkejN.jpeg\" style=\"width: 125px; height:125px; float:left; margin: 0px 10px 20px 10px\"><p>The toy companies tried and failed to sell a Taft \"Billy Possum.\" Their inspiration was his favorite meal: possum and taters.<a href=\"https://www.washingtonpost.com/news/the-fix/wp/2014/09/24/politicians-and-possums-its-complicated/\" target=\"_blank\">source:WashingtonPost</a></p>"};
        question9 = {question: "Roman Emperor Gaius made which of the following a senator?", thetrue: "His mom", thefalse: "His horse", answerText: "<img src=\"http://www.gwillikers.com/files/imagecache/Starry_Picks/files/starry-pics/breyer-collectible-horses.jpg\" style=\"float:left; margin: 0px 10px 20px 10px\"><p> The Emperor made his horse a senator. When it came to a vote, the horse always voted \"Neigh!\"<a href=\"http://www.bbc.co.uk/history/historic_figures/caligula.shtml\" target=\"_blank\">source: BBC</a></p>"};
        question10 = {question: "In Medieval times, what kind of unusual criminal was called in to trial... although they could not speak?", thetrue: "Deceased Persons", thefalse: "Animals", answerText: "<img src=\"http://33.media.tumblr.com/fe507797ed4ba93d9046633524e4408c/tumblr_nv1n5l2B4E1ub2jsqo1_250.gif\" style=\"float:left; margin: 0px 10px 20px 10px\"><p> Strangley, animals were put on trial for crimes in the Medieval age. Today, animals like pizza rat are celebrated for petty theft. <a href=\"http://www.salon.com/2013/12/22/when_beasts_were_people_the_long_strange_history_of_animals_in_court/\" target=\"_blank\">source:Salon</a></p>"};
        //setting the quiz
        theQuiz = [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10];
        //right. and how many questions are there?
        numOfQuestions = 10;
        for(i=0; i<(numOfQuestions+1); i++){
          if(i===0){
            console.log("skipping overwriting 1!");
          }
          else{
            $(".questionArea").append("<div class=\"question\" id=\"question"+(i)+"\"></div>");
          }
        }
        //what is your quiz called
        choosenQuiz = "Hard Quiz";
      }
      else if (($(".quiz1").prop("checked")===false)&&(($(".quiz2").prop("checked")===true))){
        //Quiz 2 questions
        question1 = {question: "Where is the capital of the United States?", mcA: "Detroit", mcB: "Washington DC", mcC: "New York", mcD: "Tampa", answerText: "<p>The capital of the US is Washington DC</p>"};
        question2 = {question: "True or False: This test was fun.", thetrue: "True", thefalse: "False", answerText: "<p>It was fun to make this quiz, thanks for playing!</p>"};
        //setting the quiz
        theQuiz = [question1, question2];
        //right. and how many questions are there?
        numOfQuestions = 2;
        for(i=0; i<(numOfQuestions+1); i++){
          if(i===0){
            console.log("skipping overwriting 1!");
          }
          else{
            $(".questionArea").append("<div class=\"question\" id=\"question"+(i)+"\"></div>");
          }
        }
        //what is your quiz called
        choosenQuiz = "Easy Quiz";
      }
      else{
        alert("Something went wrong");
      }
      $(".quizChoices").hide();
      event.preventDefault();
      $(".nextButton").text("NEXT");
      if (questionCounter < (numOfQuestions+1)){
        // //Start timer through startWatch
        // $(".timerArea").show();
        // startWatch();
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
        //For Quiz1
        if(($(".quiz1").prop("checked")===true)&&(($(".quiz2").prop("checked")===false))){
          checkAnswer(1, "#itsTrueFalse", "#true");
          checkAnswer(2, "#multipleChoice", "#mcB");
          checkAnswer(3, "#itsTrueFalse", "#true");
          checkAnswer(4, "#itsTrueFalse", "#false");
          checkAnswer(5, "#multipleChoice", "#mcC");
          checkAnswer(6, "#itsTrueFalse", "#true");
          checkAnswer(7, "#itsTrueFalse", "#true");
          checkAnswer(8, "#multipleChoice", "#mcC");
          checkAnswer(9, "#itsTrueFalse", "#false");
          checkAnswer(10, "#itsTrueFalse", "#false");
        }
        if(($(".quiz1").prop("checked")===false)&&(($(".quiz2").prop("checked")===true))){
          checkAnswer(1, "#multipleChoice", "#mcB");
          checkAnswer(2, "#itsTrueFalse", "#true");
        }
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
          $(".questionArea").html("<div class=\"questionStart\" id=\"question0\">Hello! Would you like to play a game?</div>");
          $("#question0").show();
          $("#question0").text("Hello! Would you like to play a game?");
          //quizes
          $(".quiz1").prop("checked", false);
          $(".quiz2").prop("checked", false);
          $(".quizChoices").show();
          //Do not continue to track this event click...
          $(".refreshButton").off("click");
        });
        //Variables
        questionCounter = 0;
        answerCounter = 0;
        numOfQuestions = 0;
      }
      questionCounter++;
    }
  });
});
