/**
 * [jquery ui 方式编写的天气轮播插件，还需要根据具体的空间大小设置大小展示]。
 * 该插件依赖html结构和css的表现样式。
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */
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