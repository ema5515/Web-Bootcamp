document.querySelectorAll(".drum").forEach(item => {item.addEventListener("click", handleClick)});

var audio = new Audio("sounds/tom-1.mp3");

function handleClick() {
    alert("I got clicked!");
    audio.play();
    this.style = "color: #f5f5f5";

}