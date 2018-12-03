$(document).ready(function(){
    console.log("be happy");
    $("a").click(function(event){
        console.log(event);
        return false;
        event.privateDefault();
    });
    $("#select_click").click(function(){
        var $options = $("#select1 option:selected")
        var $remove = $options.remove();
        $("#select2").append($remove);
    });

    $("#load_test").load("./scroll.html");
})