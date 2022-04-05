var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var colour;
var level = -1;

$("html").keypress(function(){
    if(($("#level-title").text()) == "Press A Key to Start"){
        nextSequence();
    }else{
        alert("game already started! reload to restart...");
    }
});



function nextSequence(){
    level += 1;
    $("#level-title").text("level " + level);

    //scegle un colore e lo inserisce a fine gamepattern
    var randomNumber = Math.floor((Math.random())*4);
    var randomChosenColour = buttonColours[randomNumber]; 
    gamePattern.push(randomChosenColour);

    playGamePattern();


    
};

function playGamePattern(){
    var i = 0;
    do {
        setTimeout(function(){
            $("#" + gamePattern[i]).fadeOut(150).fadeIn(150);
            i++;
        }, 1000);
        i++;
    }while(i<gamePattern.length)
};

function userGamePattern(){

}



function handler(a) {
    userClickedPattern.push(a);
};


function animation(a){
    $("." + a).addClass("pressed");
    setTimeout(function(){
        $("." + a).removeClass("pressed");
    }, 100);
};


$(".btn").click(function(){
    colour = $(this).attr("id");
    handler(colour);
    animation(colour);
    var audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
});
