
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

//start the game and call the nextSequence()
$(document).keydown(function(event) {
  if (!started) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  }
});


//check which button is pressed and append to userClickedPattern[]
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


//
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor); //chooses random button when the game starts first

  //animate flash on the button pressed by the user
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

  //play sound based on the button pressed by the user
  playSound(randomChosenColor);
}



//evaluate each clicks by the user
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {  //checks that the position of both patterns are the same
    if (userClickedPattern.length === gamePattern.length){  //checks that the user has finished the pattern for that level
      setTimeout(nextSequence, 1000);  // wait 1000 milliseconds before calling nextSequence()
    }
  }

  else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}



// add sound to button clicks
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}



// add animation to user clicks
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}



//restart the game
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
