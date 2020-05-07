var buttonColors = ["red", "blue", "green", "yellow"]
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    randomNumber = Math.floor(Math.random() * 4);
    randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);

    playAudio(randomChosenColor);

    level += 1;
    $("#level-title").text("Level " + level);

    userClickedPattern.splice(0, userClickedPattern.length);

    console.log("game pattern = " + gamePattern);
}

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    playAudio(userChosenColor);
    animatePress(userChosenColor);

    console.log("user pattern = " + userClickedPattern);

    var index = userClickedPattern.length - 1;
    checkAnswer(index);
});

$(document).keypress(function(event) {
    if(started)
        return;

    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 65 || keycode == 97){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


function checkAnswer(userIndex){
    if(gamePattern[userIndex] === userClickedPattern[userIndex])
    {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
            setTimeout(() => { nextSequence(); }, 1000);
    } 
    else
    {
        console.log("fail");
        playAudio("wrong");
        
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any key to Restart.");

        setTimeout(() => { $("body").removeClass("game-over"); }, 200);

        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern.splice(0, gamePattern.length); // or can use gamePattern = [];
    userClickedPattern.splice(0, userClickedPattern.length);
}


function playAudio(audioName){
    var audio = new Audio("sounds/"+audioName+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
