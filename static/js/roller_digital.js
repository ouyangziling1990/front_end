$(function($){
    var $num = $('#num')
    var $num1 = $('#num1')
    var $num2 = $('#num2')

    var digital = 2342
    var digital_str = toThousands(2342) 
    var digital_arr = digital_str.split('')

    $num1.empty()
    digital_arr.forEach(function(e, index){
        var $span = $('<i></i>').text(e) 
        $num1.append($span)
    })

    function setRollerDigital(num){
        // 不是数字就return
        var digital_str = toThousands(2342) 
        var digital_arr = digital_str.split('')
    }

    $('#num2 i').animate({backgroundPosition: "-24px 0"}, 1)
    var i = 1;
    $('#button').on('click', function(){
        var prop = -70 * i;
        
        $('#num2 i').animate(
            {
                'background-position-x': prop + 'px', 
                'background-position-y': 0}, 'slow', 'swing')
        i++;
    })

    $('#button2').on('click', function(){
        var num = $('#in').val()
        showRollNum($('#num3'), num)
    })
    $('#button3').on('click', function(){
        var num = $('#in1').val()
        showRollNum($('#num4'), num, 21)
    })
    //数字滚动控制
    function showRollNum(elem, n, scope_length){
        // $(elem).empty()
        if(!scope_length){
            scope_length = 19
        }
        if(String(n).length > 3){n = toThousands(n)}
        var it = elem.find('i');
        var len = String(n).length;
        if(it.length > len){
            elem.find('i').eq(len-1).nextAll().remove()
        }
        for(var i = 0; i < len; i++){
            if(it.length <= i){
                if((len-i) % 4 == 0){
                    elem.append("<i style='width:14px'></i>")
                }else{
                    elem.append("<i></i>")
                }
            }
            var num = String(n).charAt(i);
            //根据数字图片的高度设置相应的值
            var y,obj = elem.find('i').eq(i);
            if(!isNaN(num)){
                y = -parseInt(num) * scope_length;
                obj.animate({'background-position-x': '0', 'background-position-y': String(y) + 'px'},'slow','swing',function(){});
            }else{
                y = -parseInt(10) * scope_length;
                obj.css('background-position','0 ' + String(y) + 'px');
            }
        }
    }

    $('#countup_button').on('click', function(){
        countUp($('#countup')[0], 0, $('#countup_input').val())
    })
    function countUp(obj, begin, end) {
        var options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
        };
        var numAnim = new CountUp(obj, begin, end, 0, 2.5, options);
        numAnim.start();
    }
})

$(function($){
    var button_odo = $("#button_odo")
    $("#button_odo").click(function(){
        $('#odometer_2').text($('#odo_val').val())
    })
})