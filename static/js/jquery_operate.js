$(function($) {
    //jquery1.6之后新增.prop()属性，因此jquery1.6之后的版本，用var isSelected = $("#checkAll").prop("checked")；选中则isSelected=true;否则isSelected=false;  来判断是否选中！
    $('#checkAll').click(function() {
        $("input[name=subbox]").prop("checked", true)
    })
    $('#checkno').click(function() {
        $("input[name=subbox]").prop("checked", false)
    })

    $("#firstselect").click(function() {
        var val = $($("input[name='subbox']")[0]).val()
        $first = $("#firstbox")
        $first.prop('checked', true)
        console.log('checkbox第一个值： ' + val)
        console.log($("#firstbox").prop("checked"))
    })
    $("#secondselect").click(function() {
        $("input[name='subbox']").get(1).checked = true;
    })
    $("#fourselect").click(function() {
        $("input[name='subbox'][value=4]").prop('checked', true)
    })
    $("#selectedVal").click(function() {
        $("input[type=checkbox]:checked").each(function() { //由于复选框一般选中的是多个,所以可以循环输出选中的值  
            console.log($(this).val())
        });
    })


    $("#radio_first").click(function() {
        $("input[type='radio']").get(0).checked = true;
    })
    $("#radio_second").click(function() {
        var val = $("input[type='radio'][name='radio']:checked").val()
        console.log("radio_second: " + val)
    })
    $("#radio_third").click(function() {
        $("input[type='radio'][name='radio'][value=2]").prop('checked', true)
    })
    $("#radio_four").click(function() {
        var res = $("input[type='radio']").get(3).checked
        console.log("radio_four: " + res)
    })
    $("#radio_five").click(function() {
        $("input[type='radio'][name='radio']").prop("checked", false)
    })


    // select 操作
    // 
    $("#select_id").change(function() {

    })
    var $select = $("#select_id")
    $("#select_first").click(function() {
        var val = $select.val()
        console.log("#select_first: " + val)
    })
    $("#select_sec").click(function() {
        var selected_text = $("#select_id :selected").text()
        console.log("select_sec: " + selected_text)
    })
    $("#select_thi").click(function() {
        var selectedIndex = $("#select_id").prop("selectedIndex");
        console.log("selectedIndex: " + selectedIndex)
        // 4.获取Select选中项的索引值,或者：$("#select_id").get(0).selectedIndex; 
    })
    $("#select_fou").click(function() {
        $("#select_id").append("<option value='新增'>新增option</option>");
    })
    $("#select_fiv").click(function() {
        $select.val(5)
    })



    // 事件
    var xTriggered = 0;
    $("#target").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
        }
        xTriggered++;
        var msg = "Handler for .keypress() called " + xTriggered + " time(s).";
        console.log(String.fromCharCode(event.which))
        // console.log(msg);
        // console.log(event);
    });



})
function max(){
    var max = Number.NEGATIVE_INFINITY;
    for(var i = 0; i<arguments.length; i++) {
        if(arguments[i] >max) max = arguments[i]
    }
    return max
}
//闭包
var scope = "global scope"
function checkscope(){
    var scope = "local scope"
    function f(){
        return scope;
    }
    return f;
}
console.log(checkscope()())