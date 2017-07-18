
//Global Variables
var queryURL = "https://opentdb.com/api.php?amount=10&category=21&type=multiple";
var questions;
var currentQuestion = 0;
var clockRunning = false;

console.log("dave");

$("#startButton").click(getQuestions);

function startGame() {
	$("#startButton").hide();
	displayQuestion();
}


function getQuestions(){
	$.ajax({
	url:queryURL,
	method:"GET"

	}).done(function(result){
		questions=result.results;
		startGame();
	});
}

function gameOver(){
	$("#startButton").show();	
}

function displayQuestion(){
	var question = questions[currentQuestion];
	var choices = question.correct_answer;
	for(var i = 0; i < question.incorrect_answers.length; i++){
		choices += "<br>" + question.incorrect_answers[i];
	}
	console.log(question +1 + ": " + question.question);
	$("#question").html(question.question);
	$("#choices").html(choices);
	currentQuestion++;

	//TO DO: Make an empty div
	//	
}