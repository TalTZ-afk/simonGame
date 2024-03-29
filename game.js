
var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var gameRunning = false;
var startNextLevel = false;
var level = 0;

$(".play-button").click(function() {
  if(!gameRunning) {
    gameRunning = true;
    nextSequence();
  }
});

$(".btn").click(function handler() {
  var userChosenColor = $(event.target).attr("id");
  userClickedPattern[userClickedPattern.length] = userChosenColor;
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer();
});

function nextSequence() {
  if(gameRunning) {
    while(userClickedPattern.length > 0) {
      userClickedPattern.pop();
    }
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.round((Math.random() * 3));
    randomChosenColor = buttonColors[randomNumber];
    gamePattern[gamePattern.length] = randomChosenColor;
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
  }
}

function checkAnswer() {
  if(gameRunning) {
    for(i = 0 ; i < userClickedPattern.length ; i++) {
      if(gamePattern[i] === userClickedPattern[i]) {
        if(userClickedPattern.length === gamePattern.length) {
          startNextLevel = true;
        } else {startNextLevel = false;}
      } else {
       wrongAnswer();
     }
   }
   if(startNextLevel) {
     setTimeout(nextSequence,1000);
   }
  } else {
    userClickedPattern.pop();
    wrongAnswer();
  }
}

function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  },100);
}

function wrongAnswer() {
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  },200);
  var mistakeAudio = new Audio("sounds/wrong.mp3");
  mistakeAudio.play();
  gameRunning = false;
  $("#level-title").text("Game Over, Press Play to Restart");
  level = 0;
  while(gamePattern.length > 0) {
    gamePattern.pop();
  }
  while(userClickedPattern.length > 0) {
    userClickedPattern.pop();
  }
}
