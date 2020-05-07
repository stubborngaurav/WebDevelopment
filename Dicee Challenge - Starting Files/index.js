var randomNumber1 = Math.floor(Math.random() * 6) + 1;
console.log(randomNumber1);
var imgName = "images/dice"+randomNumber1 +".png";
document.querySelector(".img1").setAttribute("src", imgName);


var randomNumber2 = Math.floor(Math.random() * 6) + 1;
console.log(randomNumber2);
var img2Name = "images/dice"+randomNumber2 +".png";
document.querySelector(".img2").setAttribute("src", img2Name);

var finalText = String.empty;
if(randomNumber1 > randomNumber2){
    finalText = "🧶 Player 1 Win !!";
}
else if(randomNumber1 < randomNumber2){
    finalText = "🧶 Player 2 Win !!";
}
else{
    finalText = "Draw !!";
}

document.querySelector("h1").innerHTML = finalText;
