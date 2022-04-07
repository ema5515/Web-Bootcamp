var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var colour;
var level = 0;
var i;
var started = false;
var lastClickedButton;

//inizio del gioco
$(document).keypress(function(){
    if(!started){
        started = true;
        nextSequence();
    }else{
        alert("game already started! reload to restart...");
    }
});

//funzione base del gioco
function nextSequence(){
    level++;
    $("#level-title").text("level " + level);
    i = 0;

    //scegle un colore e lo inserisce a fine gamepattern
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    setTimeout(function(){
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    }, 500);
    
    
};

function restart(){
    $("#level-title").text("level " + level + "\n\n GAME OVER!\n");
    $(".container").addClass("display-no");
    $(".restart-button").removeClass("display-no");
    $("#level-title").fadeOut(150).fadeIn(150).fadeOut(150).fadeIn(150);
}


//animazione e suono dei pulsanti
function animation(a){
    $("." + a).addClass("pressed");
    setTimeout(function(){
        $("." + a).removeClass("pressed");
    }, 100);
};


$(".btn").click(function(){
    colour = $(this).attr("id");
    animation(colour);
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();

    if(colour===gamePattern[i]){
        console.log("perfect");
        console.log("before " + i)
        i++;
        console.log("after " + i)   
    } else{
        restart();
    }
        if(i===gamePattern.length){
            nextSequence();
        }
});

$(".restart-button").click(function(){
    window.location.reload();
})
