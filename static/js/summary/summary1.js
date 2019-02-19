var global_var = {}
//header
//天气轮播效果
$(function($) {
    getWeather();
    interval_timeout(function() {
        getWeather();
    }, 60 * 60 * 1000, undefined, '')
    // 修改天气
    function getWeather() {
        var weatherS = $('#weather_t'),
            weatherI = $('.weather img');
        var data = common_data['weather_data']
        // $.get('/analysis/weather/info', function(data) {
            if (data.code === 0) {
                weatherS.text(data.data.BJ_weather_info.temperature.replace(/℃/g, '°'));
                if (data.data.BJ_weather_info.weather.indexOf('雪') > -1) {
                    weatherI[0].src = '/static/Themes/Images/ICON/mh_snow.png'
                } else if (data.data.BJ_weather_info.weather.indexOf('雨') > -1) {
                    weatherI[0].src = '/static/Themes/Images/ICON/mh_rain.png'
                } else if (data.data.BJ_weather_info.weather.indexOf('阴') > -1) {
                    weatherI[0].src = '/static/Themes/Images/ICON/mh_cloudy.png'
                } else {
                    weatherI[0].src = '/static/Themes/Images/ICON/mh_sunny.png'
                }

                other_city_continers = data.data.other_weather_info;
                $('#other_city_continer').carouselWeather(other_city_continers)
            }
        // })
    }
})

//日期时间
$(function($) {
    var now_time = $('#now_time'),
        now_day = $('#now_day'),
        now_date = $('#now_date'),
        lunar = $('#lunar');
    showNowTime();
    interval_timeout(function() {
        showNowTime();
    }, 1000, undefined, '')

    function showNowTime() {
        var time = getTime();
        now_date.text(time.cymd);
        now_day.text(time.days);
        now_time.text(time.ntime)
        lunar.text(time.lunar)
    }

    function getTime() {
        var date = new Date();
        var Y = date.getFullYear(),
            M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
            D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
            day = date.getDay(),
            days = '';
        switch (day) {
            case 1:
                days = '星期一';
                break;
            case 2:
                days = '星期二';
                break;
            case 3:
                days = '星期三';
                break;
            case 4:
                days = '星期四';
                break;
            case 5:
                days = '星期五';
                break;
            case 6:
                days = '星期六';
                break;
            default:
                days = '星期日';
                break;
        }
        var lulendar = calendar.solar2lunar(Y, M, D)
        var res = {
            ymd: Y + '/' + M + '/' + D,
            days: days,
            ntime: h + ':' + m + ':' + s,
            cymd: Y + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日',
            lunar: lulendar.IMonthCn + lulendar.IDayCn
        };
        return res;
    }
})