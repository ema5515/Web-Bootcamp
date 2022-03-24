$("h1").css("color", "#f7f7f7");
$("body").css("background-color", "#242424");

$("h1").addClass("big-title");

$("input").keypress(function(event){
    $("h1").text(event.key);
})