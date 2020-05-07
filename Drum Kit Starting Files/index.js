
var drumsCount = document.querySelectorAll(".drum").length;
for(var i=0; i<drumsCount; i++){
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        var buttonInnerHTML = this.innerHTML;
        playInputAudio(buttonInnerHTML);
        playAnimation(buttonInnerHTML);
    });
}

document.addEventListener('keydown', function(event){
    playInputAudio(event.key);
    playAnimation(event.key);
});


function playInputAudio(key){
    
    switch (key) {
      case "w":
        playAudio("crash.mp3");
        break;

      case "a":
        playAudio("kick-bass.mp3");
        break;

      case "s":
        playAudio("snare.mp3");
        break;

      case "d":
        playAudio("tom-1.mp3");
        break;

      case "j":
        playAudio("tom-2.mp3");
        break;

      case "k":
        playAudio("tom-3.mp3");
        break;

      case "l":
        playAudio("tom-4.mp3");
        break;

      default:
        break;
    }
}

function playAudio(audioName){
    var audio = new Audio("sounds/"+audioName);
    audio.play();
}

function playAnimation(key){
    var button = document.querySelector("."+key);
    if(button === null)
        return;
    
    button.classList.add("pressed");

    setTimeout(() => {
        button.classList.remove("pressed");
    }, 100);
}

