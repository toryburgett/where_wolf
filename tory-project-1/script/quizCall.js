//ajax request to quiz database
// var quiz;
// var qNum;
var url = "https://gist.githubusercontent.com/toryburgett/71493221c7927a506592/raw/f9a653331edd2a4f74055730eda9e344d0077045/quiz.json";

function getQuizQuestion(){
  $.ajax({
    async: false,
    url: url,
    type: "get",
    dataType: "json",
    success: function(data){
      quiz = data;
    }
  });
  return quiz;
}
getQuizQuestion();
