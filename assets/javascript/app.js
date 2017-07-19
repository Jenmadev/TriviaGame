
//Global Variables
var queryURL = "https://opentdb.com/api.php?amount=10&category=21&type=multiple";
var questions;
var question;
var currentQuestion = 0;
var clockRunning = false;
var intervalId;
var correctQuestions;
var incorrectQuestions;
var unansweredQuestions;



//  Our stopwatch object.
var stopwatch = {
  time: 30,
  reset: function() {
    stopwatch.time = 30;  
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
     resultMessage(question.correct_answer,"timeout");

    }
  },
}



//Start Game
$("#startButton").click(getQuestions);

function startGame() {
	$("#startButton").hide();
	correctQuestions = 0;
	incorrectQuestions = 0;
	unansweredQuestions = 0;
	currentQuestion = 0;
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
	$("#result").empty();
	$("#result").html("HERE ARE YOUR RESULTS: </br> CORRECT ANSWERS: " + correctQuestions + "</br> WRONG ANSWERS: " + incorrectQuestions + "</br> UNANSWERED ANSWERS: " + unansweredQuestions);
}

function displayQuestion(){
	$("#question").show();
	$("#choices").show();
	$("#result").hide();
	$("#display").show();
	stopwatch.reset();
	question = questions[currentQuestion];

	question.incorrect_answers.push(question.correct_answer);
	question.incorrect_answers.sort(function(a, b){return 0.5 - Math.random()});
	
	var choices = "";

	for(var i = 0; i < question.incorrect_answers.length; i++){
		choices += ('</br> <span class ="choice">' + question.incorrect_answers[i] +'</span>');
	}
	$("#display").html("Time Remaining: "+ '<span id="timecounter">30</span>');
	$("#question").html("Question " + (currentQuestion +1) + ": " + question.question);
	$("#choices").html(choices);
	$(".choice").click(function(){
		stopwatch.stop();
		var choice = $(this);
		var selectedAnswer = choice.text();
		if(selectedAnswer ===question.correct_answer){
			resultMessage(selectedAnswer,"correctanswer");
		}
		else{
			resultMessage(selectedAnswer,"wronganswer");
		}
	});
	stopwatch.start();
	currentQuestion++;
};


function resultMessage(correctanswer,scenario){
	$("#question").hide();
	$("#choices").hide();
	$("#result").show();
	$("#display").hide();
	if(scenario ==="correctanswer"){
		$("#result").html("YESSSS! " + "</br>Correct Answer: " + question.correct_answer);
		correctQuestions++;
	}
	else if(scenario === "wronganswer"){
		$("#result").html("NOPEEEEE! " + "</br>Correct Answer: " + question.correct_answer);
		incorrectQuestions++;
	}
	else {
		$("#result").html("OUT OF TIME! " + "</br>Correct Answer: " + question.correct_answer);
		unansweredQuestions++;
		
	}
	if (currentQuestion === 10){
		gameOver();
	}
	else{
		setTimeout(displayQuestion, 1000);
	}
}
