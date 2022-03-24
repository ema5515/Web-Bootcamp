document.querySelectorAll(".drum").forEach(item => {item.addEventListener("click", handleClick)});

var keyPressed;
    document.addEventListener("keydown", function(event){ 
        keyPressed = event.key;
        handleClick();
    }); 
    
function handleClick() {

    var buttonInnerHTML = this.innerHTML;

    switch (buttonInnerHTML || keyPressed){
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            buttonAnimation("w");
        break;

        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            buttonAnimation("a");
        break;

        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            buttonAnimation("s");
        break;
        
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            buttonAnimation("d");
        break;

        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            buttonAnimation("j");
        break;

        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            buttonAnimation("k");
        break;

        case "l":
            var kickbass = new Audio("sounds/kick-bass.mp3");
            kickbass.play();
            buttonAnimation("l");
        break;
        
        default:
            console.log(innerHTML);

    }

}


function buttonAnimation(currentKey){
    console.log(currentKey);
    var activeButton = document.querySelector("." + currentKey);
    activeButton.classList.add("pressed");

    setTimeout(function(){
        activeButton.classList.remove("pressed");
    }, 1000);
}



/*var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i=0; i<numberOfDrumButtons; i++) {

    document.querySelectorAll(".drum")[i].addEventListener("click", function() {

    var buttonInnerHTML = this.innerHTML;

    switch (buttonInnerHTML){
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
        break;

        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
        break;

        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
        break;
        
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
        break;

        case "j":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
        break;

        case "k":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
        break;

        case "l":
            var kickbass = new Audio("sounds/kick-bass.mp3");
            kickbass.play();
        break;
        
        default:
            console.log(innerHtml);

    }

}); 

}*/