
//Global Variables
var queryURL = "https://opentdb.com/api.php?amount=10&category=21&type=multiple";
var questions;
var currentQuestion = 0;
var clockRunning = false;

//  Variable that will hold our setInterval that runs the stopwatch
var intervalId;

//prevents the clock from being sped up unnecessarily
var clockRunning = false;

//  Our stopwatch object.
var stopwatch = {
  time: 10,
  reset: function() {
    stopwatch.time = 0;  
  },
  start: function() {
      console.log("start");
      if (!clockRunning) {
        intervalId = setInterval(stopwatch.count, 1000);
        clockRunning = true;
      }
  },
  stop: function() {
    clearInterval(intervalId);
    clockRunning = false;
  },
  count: function() {
    stopwatch.time--;
     $("#timecounter").html(stopwatch.time);
    if (stopwatch.time === 0){
     stopwatch.stop();
     resultMessage("test","timeout");

    }
  },
}


console.log("dave");
//Start Game
$("#startButton").click(getQuestions);

function startGame() {
	$("#startButton").hide();
	displayQuestion();
}

//Get Question from API
function getQuestions(){
	$.ajax({
	url:queryURL,
	method:"GET"

	}).done(function(result){
		questions=result.results;
		startGame();
	});
}
//End of Game
function gameOver(){
	$("#startButton").show();	
}

function displayQuestion(){
	var question = questions[currentQuestion];
	var choices = question.correct_answer;
	for(var i = 0; i < question.incorrect_answers.length; i++){
		choices += "<br>" + question.incorrect_answers[i];
	}
	$("#display").html("Time Remaining: "+ '<span id="timecounter">30</span>');
	$("#question").html("Question " + +1 + ": " + question.question);
	$("#choices").html(choices);
	stopwatch.start();

};


function resultMessage(correctanswer,scenario){
	$("#question").hide();
	$("#choices").hide();
	if(scenario ==="correctanswer"){

	}
	else if(scenario === "wronganswer"){

	}
	else {
		console.log("BOOB");
	}
}
