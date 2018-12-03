jQuery(function($){
var index = 0;
$("#partW").click(function(){
    var div = document.createElement("div");
    div.innerHTML = index++ + "卡片生成器";
    $(div).addClass("singleWarning");
    $(".warning").prepend(div);
    var div_clone = $(div).clone();
    $(".capter").prepend(div_clone);
});

//滚动方式 上下滚动
$('.warning')[0].onmousewheel=scrollFunc;
var transFT = 0;
function scrollFunc(ev) {
    console.log(ev);
    ev = ev || window.event;
    ev.preventDefault();
    ev.returnValue = false;
    var max = $('.warning_wrap').height() - $('.warning').height() + 30;
    if(max>0) {
        return;
    }
    if(ev.wheelDelta>0 || ev.detail<0){
        // 向上滚
        var top = transFT + 20;
        if(top>20){
            top = 20
        }
        $('.warning').css('top',top+'px')
    }else {
        var top = transFT - 20;
        if(top<max){
            top = max
        }
        $('.warning').css('top',top+'px')
    }
    transFT = top;
} 

var trans_capter = 0;
$(".content_right").click(function(){
    var capter_warp_width = $(".capter_warp").width();
    var capter_width = $(".catper").width();
    trans_capter++;
    $(".capter").css("left",  trans_capter* -30 + "px")

});

//效果切换
$("#anminate_area").click(function(){
    console.log("be quick")
    $(".anminate_content").toggleClass("hidden_t")
});
});


