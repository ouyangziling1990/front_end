
$(function($){
    var $img2 = $('#img2')
    var $input_trans = $("#input_trans")
    $('#transitionChange').bind('click', function(){
        $img2.css('transition', $input_trans.val())
    })
    $("#button2").bind('click', function(){
        $img2.css({'height':'100px', 'width':'100px'})
    })
    $("#button3").bind('click', function(){
        $img2.css({'height':'20px', 'width':'20px'})
    })
})