(function($){
    $.fn.maxHeight = function(){
        var max = 0;
        this.each(function(){
            max = Math.max(max, $(this).height())
        })
        return max;
    }
    $.fn.carouselWeather = function(weatherData) {
        if(!$.isArray(weatherData)){
            console.error('weatherData is not an array')
            return
        }else{
            let length = weatherData.length
            if(length <2){
                console.error('the length of weatherData is bellow 2')
                return
            }
        }
        if(this.length != 1){
            console.error('selector find dom is not only one')
            return
        }
        this.each(function(){
            //add param data
            var $container = $(this)
            $container.empty()
            $container.css('position', 'relative');

            weatherData.push(weatherData[0])
            weatherData.push(weatherData[1])

            for(var i = 0; i<weatherData.length; i++){
                var name = weatherData[i].name
                var temperature = weatherData[i].temperature
                var weather = weatherData[i].weather
                var p = $("<p></p>").addClass('weather_not_act')
                    .append($("<span></span>").text(name))
                    .append($("<span></span>").text("·"))
                    .append($("<span></span>").text(weather))
                    .append($("<span></span>").text(temperature))

                $container.append(p)
            }
            $($container.find('.weather_not_act').get(1)).removeClass('weather_not_act').addClass('weather_act')

            //add movement
            var scope = 19;
            var index = 0;
            setInterval(function () {
                    var length = $container.find('p').length
                    if (index == length - 2) {
                        $container.css('top', '0px')
                        index = 0
                    } else {
                        $container.animate(
                            {'top': '-' + index * scope + 'px'},
                            1500, "linear")
                    }
                    $container.find('.weather_act')
                        .removeClass("weather_act").addClass("weather_not_act")
                    var $ps = $container.find('p');
                    if (length - index > 1) {
                        $($ps.get(index+1))
                            .removeClass('weather_not_act')
                            .addClass('weather_act')
                    } else {
                        $($ps.get(index))
                            .removeClass('weather_not_act')
                            .addClass('weather_act')
                    }

                    index++;
                }, 5 * 1000)
        })
    }
})(jQuery)

$(function($){
    var tallest = $('div').maxHeight()
    console.log(tallest)
    

    //一般书写过程
    var other_city_continers = [
        {
            name:"天津",
            temperature:"2℃",
            weather:"晴"
        },{
            name:"石家庄",
            temperature:"3℃",
            weather:"晴"
        },{
            name:"济南",
            temperature:"3℃",
            weather:"晴"
        },{
            name:"郑州",
            temperature:"-1℃",
            weather:"晴"
        },{
            name:"南宁",
            temperature:"3℃",
            weather:"晴"
        },{
            name:"台儿庄",
            temperature:"3℃",
            weather:"晴"
        }
         ];
    
    //插件方式生成天气轮播效果。
    var test = $('#scroll_weather').carouselWeather(other_city_continers)


    $("#other_city_continer").empty()
    other_city_continers.push(other_city_continers[0])
    other_city_continers.push(other_city_continers[1])
    for (var i = 0; i < other_city_continers.length; i++) {
        var name = other_city_continers[i].name
        var temperature = other_city_continers[i].temperature
        var weather = other_city_continers[i].weather
        var p = $("<p></p>").addClass('weather_not_act')
            .append($("<span></span>").text(name))
            .append($("<span></span>").text("·"))
            .append($("<span></span>").text(weather))
            .append($("<span></span>").text(temperature))

        $("#other_city_continer").append(p)
    }
    $($("#other_city_continer .weather_not_act")[1])
        .removeClass("weather_not_act").addClass("weather_act")
    var scope = 19;
    var index = 0;
    var other_city_continer = $("#other_city_continer");
    var weather_interval = setInterval(function () {
        var length = $("#other_city_continer p").length
        if (index == length - 2) {
            other_city_continer.css('top', '0px')
            index = 0
        } else {
            other_city_continer.animate(
                {'top': '-' + index * scope + 'px'},
                1500, "linear")
        }
        $("#other_city_continer .weather_act")
            .removeClass("weather_act").addClass("weather_not_act")
        if (length - index > 1) {
            $($("#other_city_continer p")[index + 1])
                .removeClass('weather_not_act')
                .addClass('weather_act')
        } else {
            $($("#other_city_continer p")[index])
                .removeClass('weather_not_act')
                .addClass('weather_act')
        }

        index++;
    }, 5 * 1000)
})