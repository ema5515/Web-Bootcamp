document.querySelector(".img2").setAttribute("src", "./images/dice6.png");
document.querySelector(".img1").setAttribute("src", "./images/dice6.png");

    var randomNumber1 = Math.random();
    randomNumber1 = Math.floor((randomNumber1 * 6)+1);
    console.log(randomNumber1);

    document.querySelector(".img1").setAttribute("src", "./images/dice" + randomNumber1 + ".png");


    var randomNumber2 = Math.random();
    randomNumber2 = Math.floor((randomNumber2 * 6)+1);
    console.log(randomNumber2);

    document.querySelector(".img2").setAttribute("src", "./images/dice" + randomNumber2 + ".png");

    if(randomNumber1 < randomNumber2){
        document.querySelector("#title").innerHTML="Player 2 Wins🚩";
    };

    if(randomNumber1 > randomNumber2){
        document.querySelector("#title").innerHTML="🚩Player 1 Wins";
    };
    
    if(randomNumber1 == randomNumber2){
        document.querySelector("#title").innerHTML="Draw!";
    };