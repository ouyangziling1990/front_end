var global_var = {
    weather_icon_path: '../../static/images/weather_icon/'
}
//header
//天气轮播效果
$(function($) {
    var weather_icon_path = global_var['weather_icon_path']
    getWeather();
    // interval_timeout(function() {
    //     getWeather();
    // }, 60 * 60 * 1000, undefined, '')
    // 修改天气
    function getWeather() {
        var weatherS = $('#weather_t'),
            weatherI = $('.weather img');
        var data = common_data['weather_data']
        // $.get('/analysis/weather/info', function(data) {
        if (data.code === 0) {
            weatherS.text(data.data.BJ_weather_info.temperature.replace(/℃/g, '°'));
            if (data.data.BJ_weather_info.weather.indexOf('雪') > -1) {
                weatherI[0].src = weather_icon_path + 'mh_snow.png'
            } else if (data.data.BJ_weather_info.weather.indexOf('雨') > -1) {
                weatherI[0].src = weather_icon_path + 'mh_rain.png'
            } else if (data.data.BJ_weather_info.weather.indexOf('阴') > -1) {
                weatherI[0].src = weather_icon_path + 'mh_cloudy.png'
            } else {
                weatherI[0].src = weather_icon_path + 'mh_sunny.png'
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

//铁路出站模块
$(function($) {

    var chart1 = echarts.init(document.getElementById('statistic_1'));
    $(window).resize(function() {
        chart1.resize()
    })

    //todo 铁路camerasID
    var tarin_cameras = JSON.stringify(["C2C5-C1C2-91AD-0D23", "CF8D-E016-3F03-1541", "6D82-2191-D317-1173", "D469-18C7-9677-1D71", "40B9-2605-E065-ED45"]);
    //todo 地铁进口canmerasID
    var subwayIn_cameras = JSON.stringify(["8661-1E97-62CC-FB86", "C523-3026-C45C-982F", "8CDF-ED6D-B821-20D8", "42CE-F624-4085-0B47"]);
    //todo top_left 1小时，24小时切换，默认24
    var left_top_type = 24;
    $('#statistic_1_type').on('click', 'span', function() {
        if ($(this).hasClass('act')) {
            return
        }
        $('#statistic_1_type .act').removeClass('act');
        $(this).addClass('act');
        if ($(this).hasClass('type_hour')) {
            left_top_type = 1;
        } else {
            left_top_type = 24;
        }
        getCamerasInfo(tarin_cameras, left_top_type, 'train');
    })

    getCamerasInfo(tarin_cameras, left_top_type, 'train');

    //todo top/left 铁路，地铁图表切换
    function getCamerasInfo(camera_ids, type, category) {
        if (type == 24) {
            var str = get_datestr_scope(1)
            var param = {
                'camera_ids': camera_ids,
                'start_time': str.start_time,
                'end_time': str.end_time,
                'time_id': 3,
                'is_sum': 1
            }
            var xname = '时';
        } else if (type == 1) {
            var str = get_datestr_scope(2)
            var param = {
                'camera_ids': camera_ids,
                'start_time': str.start_time,
                'end_time': str.end_time,
                'time_id': 1,
                'is_sum': 1
            }
            var xname = '分';
        }
        var res = {}
        if (type == 1) {
            res = common_data['30min_flow']
        } else {
            res = common_data['today_flow']
            // console.log('24h')
            // console.log(res)
        }
        if (res.code != 0) {
            return;
        }
        if (res['data']['group'].length == 0) {
            layer.msg('暂无数据', {
                icon: 2,
                time: 1000
            })
            return;
        }

        var color = ['#d21961', '#1bfee6', '#ebdf00', '#1eff00'];
        var legend = [],
            xArr = [],
            series = [],
            seriesList = [];
        if (type == 1) {
            for (var j in res['data']['group'][0]['data']) {
                if (res['data']['group'][0]['data'][j].in_num !== null) {
                    xArr.push(j.slice(0, j.lastIndexOf(':')))
                }
            }
        } else if (type == 24) {
            for (var j in res['data']['group'][0]['data']) {
                xArr.push(Number(j.slice(j.indexOf(' ') + 1, j.indexOf(':'))))
            }
            xArr.push(xArr[0])
            //todo 今日客流客流量
            var stat_number = 0;
            for (var k in res.data['total']) {
                if (category == 'train') {
                    stat_number += res.data['total'][k]['in_num'];
                } else if (category == 'subway') {
                    stat_number += res.data['total'][k]['out_num'];
                }
            }
            // countUp($('#left1')[0], $('#left1').html().replace(',', ''), stat_number)
            showRollNum($('#left1'), stat_number)
            //todo end
        }
        //todo 北二出站口1,2累加
        var dataList = []
        Object.assign(dataList, res['data']['group']);
        var tempList;
        for (var n in dataList) {
            if (dataList[n]['id'] == "6D82-2191-D317-1173") {
                tempList = dataList[n];
                dataList.splice(n, 1)
            }
        }
        for (var m in dataList) {
            if (dataList[m]['id'] == "CF8D-E016-3F03-1541") {
                dataList[m]['name'] = '出站口1(西北)';
                for (var o in dataList[m]['data']) {
                    if ((dataList[m]['data'][o]['in_num'] === null) && (tempList['data'][o]['in_num'] === null)) {
                        continue;
                    }
                    dataList[m]['data'][o]['in_num'] += tempList['data'][o]['in_num'];
                    dataList[m]['data'][o]['out_num'] += tempList['data'][o]['out_num'];
                }
            }
        }
        //todo end
        for (var k in dataList) {
            legend.push(dataList[k]['name']);
            var yArr = [];
            if (type == 1) {
                for (var i in dataList[k]['data']) {
                    if (dataList[k]['data'][i]['in_num'] !== null) {
                        yArr.push(dataList[k]['data'][i]['in_num'])
                    }
                }
            } else if (type == 24) {
                for (var i in dataList[k]['data']) {
                    if (category == 'train') {
                        yArr.push(dataList[k]['data'][i]['in_num'])
                    } else if (category == 'subway') {
                        yArr.push(dataList[k]['data'][i]['out_num'])
                    }
                }
                yArr.push(yArr[0])
            }

            seriesList.push(yArr);
        }
        var tmp_yArr = []
        for (var i = 0; i < seriesList[0].length; i++) {
            var count = 0
            var flag = false
            for (var j = 0; j < seriesList.length; j++) {
                var tmp = seriesList[j][i]
                if (tmp == null) {
                    tmp_yArr.push(null)
                    flag = true
                    break
                }
                count += tmp
            }
            if (!flag) {
                tmp_yArr.push(count)
            }
        }
        seriesList = [tmp_yArr]
        legend = ['2019年']
        seriesList.forEach(function(val, index) {
            series.push({
                name: legend[index],
                type: 'line',
                smooth: 0.2,
                symbolSize: 4,
                lineStyle: {
                    width: 1
                },
                data: val,
                animationEasing: 'bounceOut'
            })
        })

        var yArr2 = getTrain2018Flow(type)
        legend.push('2018年')
        seriesList.push(yArr2)
        series.push({
            name: legend[1],
            type: 'line',
            smooth: 0.2,
            symbolSize: 4,
            lineStyle: {
                width: 1,
                type: 'dotted'
            },
            data: yArr2,
            animationEasing: 'bounceOut'
        })

        var legendArr = [];
        for (var i = 0; i < legend.length; i++) {
            legendArr.push({
                'name': legend[i],
                'icon': 'rect',
                'textStyle': { 'color': '#49fffe', 'fontSize': 10 }
            })
        }

        var param = {
            'color': color,
            'xArr': xArr,
            'series': series,
            'legend': legendArr,
            'legendShow': true,
            'boundaryGap': false,
            'alignWithLabel': false,
            'xname': xname
        }
        createChart1(param, chart1, type)
    }
    function getTrain2018Flow(type) {
        var res = ''
        var url = ''
        var cameraid = ['BJXZ1000013001', 'BJXZ1000013002', 'BJXZ1000013003', 'BJXZ1000013004']
        var camera_ids = JSON.stringify(cameraid)
        if (type == 24) {
            var str = get_datestr_scope(1)
            var param = {
                'cameraids': camera_ids,
                'start_time': str.start_time,
                'end_time': str.end_time,
                'time_id': 3,
                'is_sum': 1
            }
            var xname = '时';
            url = '/analysis/getwalkerflow'
        } else if (type == 1) {
            var str = get_datestr_scope(2)
            var param = {
                'cameraids': camera_ids,
                'start_time': str.start_time,
                'end_time': str.end_time,
                'time_id': 1,
                'is_sum': 1
            }
            var xname = '分';
            url = '/analysis/getwalkerflowhour'
        }
        var data = {}
        if(type == 1){
            data = common_data['walkerflowhour']
        }else{
            data = common_data['walkerflow']
        }
        var code = data.code
        if (code != 0) return;
        var yArr = []
        for (var x in data.data) {
            yArr.push(data.data[x]['innum'])
        }
        yArr.push(yArr[0])
        res = yArr
        return res
    }

    getthirtyData(tarin_cameras, 'train')

    //todo chart1
    var timer = null;
    var flag = false;
    $('#left_top').mouseenter(function() {
        flag = true
    }).mouseleave(function() {
        flag = false;
    })
    var charge = false;
    setInterval(function() {
        if (flag) return;
        if (charge) {
            $('#statistic_1_type .type_hour').click()
        } else {
            $('#statistic_1_type .type_day').click()
        }
        charge = !charge;
        getthirtyData(tarin_cameras, 'train')
    }, 10 * 1000)
    function getthirtyData(camera_ids, category) {
        showRollNum($('#left2'), 1214)
    }
    function createChart1(param, obj, type) {
        clearInterval(timer)
        var option1 = {
            color: param.color,
            grid: {
                top: '30',
                bottom: '50',
                left: '42',
                right: '28'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    var res = '';
                    if (type == 24) {
                        if (params[0].dataIndex === param.xArr.length - 1) {
                            res = '<div>' + params[0].axisValue + ':00 -</div>';
                        } else {
                            res = '<div>' + params[0].axisValue + ':00 - ' + params[0].axisValue + ':59</div>';

                        }
                        for (var i = 0; i < params.length; i++) {
                            res += '<div>' + params[i].marker + params[i].seriesName + '：' + toThousands(Math.floor(params[i].value)) + '人</div>';
                        }
                    } else if (type == 1) {
                        if (params[0].dataIndex === param.xArr.length - 1) {
                            res = '<div>' + params[0].axisValue + '-</div>';
                        } else {
                            var str = '1970-01-01 ' + params[0].axisValue;
                            var limit = new Date(new Date(str).getTime() + 1000 * 60 * 10);
                            var hours = limit.getHours();
                            var minutes = limit.getMinutes();
                            hours = hours < 10 ? ('0' + hours) : hours;
                            minutes = minutes < 10 ? ('0' + minutes) : minutes;
                            limit = hours + ':' + minutes;
                            res = '<div>' + params[0].axisValue + '-' + limit + '</div>';

                        }
                        for (var i = 0; i < params.length; i++) {
                            res += '<div>' + params[i].marker + params[i].seriesName + '：' + toThousands(Math.floor(params[i].value)) + '人</div>';
                        }
                    }
                    return res;
                }
            },
            legend: {
                show: param.legendShow,
                data: param.legend,
                left: 'center',
                bottom: '5',
                itemWidth: 12,
                itemHeight: 6,
            },
            xAxis: {
                type: 'category',
                data: param.xArr,
                boundaryGap: param.boundaryGap,
                name: param.xname,
                nameTextStyle: {
                    color: '#fff'
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    },
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 12],
                    symbolOffset: [0, 10]
                },
                axisLabel: {
                    interval: 0,
                    color: '#00b3ea',
                    fontSize: 10
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(0,179,234,.5)',
                        type: 'solid'
                    }
                },
                axisTick: {
                    show: false,
                    alignWithLabel: param.alignWithLabel
                },
            },
            yAxis: {
                name: '客流量(人)',
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 12
                },
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    },
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 12],
                    symbolOffset: [0, 10]
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: 'rgba(0,179,234,.5)',
                        type: 'solid'
                    }
                },
                axisLabel: {
                    color: '#00b3ea',
                    fontSize: 10
                },
            },
            series: param.series
        };
        obj.clear();
        obj.setOption(option1, true);
    }
})

//right_top 地铁出发
$(function($){
    // type 1 为24小时的客流量， type为 2表示1小时的客流量
    var transport_dom = echarts.init(document.getElementById('subway_start'))
    $(window).resize(function(){
        transport_dom.resize()
    })
    var cameras = ["2313-72E5-6966-929D","0EB2-8F0B-5AAD-5805",
     "20F5-9CC9-EBD5-36B0","CE9A-DCDF-4D55-11EF",
     "89D1-BF98-AB5B-2066","E406-C680-AB2F-1D1B","7AD0-2A41-3381-C609" ]
    var show_data = null
    actTranFun(1)
    //用于30分钟数据更新
    getData_hour(cameras, 2)
    var mouse_in_flag = false;
    $("#right_top").mouseenter(function(){
        mouse_in_flag = true
    }).mouseleave(function(){
        mouse_in_flag = false
    })
    var show_flag = true;
    setInterval(function(){
        $('#right_top .select_span span').removeClass('selected')
        if(show_flag){
            //1小时
            actTranFun(2)
            $("#hour_1").addClass('selected')
        }else{
            //24小时
            actTranFun(1)
            $("#hour_24").addClass('selected')
            
        }
        show_flag = !show_flag
    }, 10*1000)
    function actTranFun(type){
        var param = {
            name:'客流量(人)'
        }
        show_data = type == 2 ?getData_hour(cameras, type):getData_day(cameras, type)
        
        param.xArr = show_data.xArr
        var item_color = ''
        var bar_colors = null
        if(type == 1){
            var color1 = new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 1, color: '#007fd0' },
                            { offset: 0, color: '#1bffe6' }
                        ]
                    )
            var color2 = new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 1, color: 'rgba(0,127,208,0.4)' },
                            { offset: 0, color: 'rgba(27,255,230,0.4)' }
                        ]
                    )
            // bar_colors = ['#007fd0', '#1bffe6']
            bar_colors = [color1, color2]
            item_color ={
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 1, color: '#007fd0' },
                            { offset: 0, color: '#1bffe6' }
                        ]
                    )
                }
        }else{
            bar_colors = ['#cb0851', '#fc7cb5']
            var color1 = new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 1, color: '#cb0851' },
                            { offset: 0, color: '#fc7cb5' }
                        ]
                    )
            var color2 = new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 1, color: 'rgba(203,8,81,0.4)' },
                            { offset: 0, color: 'rgba(252,124,181,0.4)' }
                        ]
                    )
            // bar_colors = ['#007fd0', '#1bffe6']
            bar_colors = [color1, color2]
            item_color = {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 1, color: '#cb0851' },
                            { offset: 0, color: '#fc7cb5' }
                        ]
                    )
                }
        }
        param["hour_type"] = type;
        param.series = [{
            
            "type": 'bar',
            data:show_data.yArr,
            name:'客流量',
            animationEasing: 'bounceOut',
            itemStyle: {
                // normal: 
                normal:{
                    color:function(params){
                        return bar_colors[params.dataIndex%2]
                    }
                }
            },
            animationDelay: function(idx) {
                return idx * 100;
            }
        }]
        setChart(param)
    }
    function getData_hour(camera, type){
        var begin_end = get_datestr_scope(type)
        var param = {
            camera_ids:JSON.stringify(camera),
            start_time: begin_end.start_time,
            end_time: begin_end.end_time,
            time_id: 1,
            is_sum: 1,
        }
        var res = {}
        var data = common_data['subway_hour']
        // $.ajax({
        //     url: flow_sys + '/exit/camerasinfo',
        //     type: 'POST',
        //     data: param,
        //     async: false,
        //     success:function(data){
                var code = data.code
                if(code != 0)return;
                // console.log(data.data.total)
                if (data['data']['group'].length == 0) {
                    return;
                }
                var data = data.data.total
                var keys = Object.keys(data)
                var xArr = [], yArr = [];
                for(var i = keys.length -1; i>=0; i--){
                    var item = data[keys[i]]
                    if(item.in_num){
                        xArr.unshift(keys[i].substr(0, 5))
                        yArr.unshift(item.in_num)
                        if(xArr.length == 6){
                            res['xArr'] = xArr
                            res['yArr'] = yArr
                            break
                        }

                    }
                }
                if(!res['xArr']){
                    res['xArr'] = xArr
                    res['yArr'] = yArr
                }
                //设置 最近30分钟客流量
                if(type == 2){
                    var min_30_count = 0;
                    var y_length = yArr.length
                    for(var i = 1; i <= 3; i++){
                        min_30_count += yArr[y_length-i]
                    }
                    // console.log('最近30分钟客流量：' + min_30_count)
                    // $('#thrity_min_flow').text(toThousands(min_30_count))
                    showRollNum($('#thrity_min_flow'), min_30_count)
                }
            // }
        // })
        
        return res
    }
    function getData_day(camera, type){
        var begin_end = get_datestr_scope(type)
        var param = {
            camera_ids:JSON.stringify(camera),
            start_time: begin_end.start_time,
            end_time: begin_end.end_time,
            time_id: 3,
            is_sum: 1,
        }
        var res = {}
        var data = common_data['subway_day']
        // $.ajax({
        //     url: flow_sys + '/exit/camerasinfo',
        //     type: 'POST',
        //     data: param,
        //     async: false,
        //     success:function(data){
                var code = data.code
                if(code != 0)return;
                var data = data.data.total
                var xArr = [], yArr = []
                for(var x in data){
                    xArr.push(Number(x.substr(0, 2)))
                    
                }
                for(var x in data){
                    var in_num = data[x].in_num
                    if(in_num == null){
                        break
                    }
                    yArr.push(in_num)
                }
                res['xArr'] = xArr
                res['yArr'] = yArr
                //设置 最近30分钟客流量
                var sum = 0;
                yArr.forEach(function(e){
                    sum += e
                })
                // $('#today_flow').text(toThousands(sum))
                showRollNum($('#today_flow'), sum)
            // }
        // })
        return res
    }
    function setChart(param){
        var hour_type = param.hour_type
        var series = param.series;
        var name = param.name
        var title = '地铁出站口客流'
        var option = {
            barMaxWidth:10,
            title:{
                text: title,
                bottom: '-6',
                left:'center',
                textStyle:{
                    color: '#49fffe',
                    fontSize: 10,
                }
             },
            grid: {
                top: '32',
                bottom: '35',
                left: '46',
                right: '20'
            },
            color:['#007fd0','#cb0851','#ffc27a','#7eb550'],
            xAxis: {
                data: param.xArr,
                name: "",
                type: 'category',
                axisTick: {
                    show: true,
                },
                axisLabel: {
                    interval: 0,
                    align: 'center',
                    margin: 8,
                    rotate: 0
                },
                splitLine: {
                    show:true,
                    lineStyle: {
                        color: ['#00b3ea'],
                        type: 'dotted',
                        opacity: 0.4
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    },
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 12],
                    symbolOffset: [0, 10]
                },
            },
            legend: '',
            yAxis: {
                splitNumber: 3,
                type: 'value',
                name: name,
                axisTick: {
                    show: true,
                },
                minInterval: 1,
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    },
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 12],
                    symbolOffset: 10
                },
                splitLine: {
                    lineStyle: {
                        color: ['#00b3ea'],
                        type: 'dotted',
                        opacity: 0.4
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    var res = '';
                    if (hour_type == 1) {
                        if (params[0].dataIndex === param.xArr.length - 1) {
                            res = '<div>' + params[0].axisValue + ':00 -</div>';
                        } else {
                            res = '<div>' + params[0].axisValue + ':00 - ' + params[0].axisValue + ':59</div>';

                        }
                        for (var i = 0; i < params.length; i++) {
                            res += '<div>' + params[i].marker + params[i].seriesName + '：' + toThousands(Math.floor(params[i].value)) + '人</div>';
                        }
                    } else if (hour_type == 2) {
                        if (params[0].dataIndex === param.xArr.length - 1) {
                            res = '<div>' + params[0].axisValue + '-</div>';
                        } else {
                            var str = '1970-01-01 ' + params[0].axisValue;
                            var limit = new Date(new Date(str).getTime() + 1000 * 60 * 10);
                            var hours = limit.getHours();
                            var minutes = limit.getMinutes();
                            hours = hours < 10 ? ('0' + hours) : hours;
                            minutes = minutes < 10 ? ('0' + minutes) : minutes;
                            limit = hours + ':' + minutes;
                            res = '<div>' + params[0].axisValue + '-' + limit + '</div>';

                        }
                        for (var i = 0; i < params.length; i++) {
                            res += '<div>' + params[i].marker + params[i].seriesName + '：' + toThousands(Math.floor(params[i].value)) + '人</div>';
                        }
                    }
                    return res;
                }
            },
            series:series
        }
        transport_dom.clear()
        transport_dom.setOption(option, true);
    }
    $("#right_top .select_span span").click(function(){
        var _this = $(this)
        var text = _this.text()
        $('#right_top .select_span span').removeClass('selected')
        _this.addClass('selected')
        if(text == '1小时'){
            actTranFun(2)
        }else{
            actTranFun(1)
        }
    })
})
//春运运力信息模块展示
$(function($){
    var springFestivalIndex = 0;
    var transport_dom = echarts.init(document.getElementById('capacity_arrive'));
    $(window).resize(function(){
        transport_dom.resize()
    })
    actTrainFun1()
    setTimeout(function(){
        actTrainFun1()
    }, 100)
    setInterval(function(){
        actTrainFun1()
    }, 10 *1000)
    var itemWidth = 10, symbolSize= 8; 
    function actTrainFun1(){
        var start_2018_date = '2018-02-01';
        var end_2018_date = '2018-03-12';

        var start_2019_date = '2019-01-21';
        var end_2019_date = '2019-03-01';
        var data_2018 = getData(start_2018_date, end_2018_date)
        var data_2019 = getData(start_2019_date, end_2019_date)
        var four_train_data = [data_2018['train']['in'], data_2018['train']['out'], data_2019['train']['in'], data_2019['train']['out']]
        var four_subway_data = [data_2018['subway']['in'], data_2018['subway']['out'], data_2019['subway']['in'], data_2019['subway']['out']]
        
        var param = {
            'train':{},
            'subway':{}
        }
        var xArr = getTransportLunar();
        param['train']['xArr'] = xArr;
        param['train']['legend'] = {
            data: [
                
                {name:'2018年进', icon:'circle'},
                {name:'2018年出', icon:'pin'},
                {name:'2019年进', icon:'rect'},
                {name:'2019年出', icon:'diamond'},
                
            ],
            itemWidth: itemWidth,
            itemHeight: itemWidth,
            textStyle: {
                fontWeight: 'normal',
                color: 'whitesmoke',
            }
        }
        // var tmp = checkFastival()
        var series =[{
                name: param['train']['legend'].data[0].name,
                type: 'line',
                data: four_train_data[0],
                smooth: true,
                symbol: 'circle',
                symbolSize: symbolSize,
                itemStyle:{
                    normal:{
                        color:"#49fffe",
                        lineStyle:{
                            color:"rgba(73,255,254,0.5)"
                        }
                    }
                }
            },
            {
                name: param['train']['legend'].data[1].name,
                type: 'line',
                data: four_train_data[1],
                smooth: true,
                symbol: 'pin',
                symbolSize: 12,
                itemStyle:{
                    normal:{
                        color:"#F93246",
                        lineStyle:{
                            color:"rgba(249,50,70,0.5)"
                        }
                    }
                }
            },
            {
                name: param['train']['legend'].data[2].name,
                type: 'line',
                data: four_train_data[2],
                smooth: true,
                symbol: 'rect',
                symbolSize: symbolSize,
                itemStyle:{
                    normal:{
                        color:"rgba(255,194,122)",
                        lineStyle:{
                            // color:"#ffc27a"
                            color:"rgba(255,194,122, 0.5)"
                        }
                    }
                }
            },
            {
                name: param['train']['legend'].data[3].name,
                type: 'line',
                data: four_train_data[3],
                smooth: true,
                symbol: 'diamond',
                symbolSize: symbolSize,
                itemStyle:{
                    normal:{
                        color:"#7eb550",
                        lineStyle:{
                            // color:"#7eb550"
                            color:"rgba(126,181,80,0.5)"
                        }
                    }
                }
            },
        ]
        
        param['train']['series'] = series
        param['train']['name'] = '铁路客流(万人)'
        param['train']['title'] = '铁路客流'

        setChart(param['train'])
        function getData(start_time, end_time){
            var res1 = {train:{}, subway:{}}
            var param ={begin: start_time, end: end_time, pageno:1, pagesize:40}
            var res = ''
            if(start_time == '2018-02-01'){
                res = common_data['data_2018']
            }else{
                res = common_data['data_2019']
            }
            // $.ajax({
            //     url:'/deepface/transportation/list',
            //     type:'POST',
            //     data:param,
            //     async:false,
            //     success:function(res){
                    var code = res.code;
                    if(code !=0)return;
                    var data = res.data.capability
                    
                    var subway_in = [], subway_out = [];
                    var train_in = [], train_out = [];
                    // for(var i = data.length -1; data>=0; i--)
                    data.forEach(function(e, index){
                        var train_data = e.train
                        var subway_data = e.subway
                        subway_in.unshift((subway_data.subway_p_in_station_num/10000).toFixed(1))
                        subway_out.unshift((subway_data.subway_p_out_station_num/10000).toFixed(1))
                        // console.log(index + ' subway_p_out_station_num: ' + subway_data.subway_p_out_station_num)
                        train_in.unshift((train_data.train_get_on_num/10000).toFixed(1))
                        train_out.unshift((train_data.train_get_off_num/10000).toFixed(1))
                    })
                    res1.subway['in'] = subway_in
                    res1.subway['out'] = subway_out
                    res1.train['in'] = train_in
                    res1.train['out'] = train_out
                // }
            // })
            return res1
        }
    }
    function setChart(param, obj){
        var dom = obj?obj:transport_dom;
        var colors = ['#49fffe','#cb0851','#ffc27a','#7eb550']
        if(obj){
            colors[0] ='#49fffe'
        }
        var legend = param['legend']
        legend.right = '20'
        var series = param.series;
        var name = param.name
        var title = param.title
        var option = {
            title:{
                text: '',
                bottom: -5,
                right: 'center',
                textStyle:{
                    color: '#49fffe',
                    fontSize:11,
                }
             },
            grid: {
                top: '32',
                bottom: '41',
                left: '41',
                right: '20'
            },
            color: colors,
            xAxis: {
                data: param.xArr,
                name: "",
                type: 'category',
                boundaryGap: false,
                axisTick: {
                    show: true,
                },
                axisLabel: {
                    interval: 0,
                    margin: 9,
                    rotate: 50,
                    fontSize: 9,
                    color:function(value, index){
                        var color = 'white';

                        switch(index){
                            case 7:
                                color = '#ff5e49'
                                break
                            case 14:
                                color = '#ff5e49'
                                break
                            case 15:
                                color = '#ff5e49'
                                break
                            case 29:
                                color = '#ff5e49'
                                break
                            default:
                                color = 'white'
                                break
                        }
                        if(index == springFestivalIndex-1){
                            return '#49fffe'
                        }
                        return color
                    }
                },
                splitLine: {
                    show:true,
                    lineStyle: {
                        color: ['#00b3ea'],
                        type: 'dotted',
                        opacity: 0.4
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    },
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 12],
                    symbolOffset: [0, 10]
                },
            },
            legend: legend,
            yAxis: {
                type: 'value',
                name: name,
                axisTick: {
                    show: true,
                },
                minInterval: 1,
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                        width: 1
                    },
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 12],
                    symbolOffset: 10
                },
                splitLine: {
                    lineStyle: {
                        color: ['#00b3ea'],
                        type: 'dotted',
                        opacity: 0.4
                    }
                }
            },
            tooltip: {
                trigger: 'axis',
                formatter:function(param){
                    // console.log(param)
                    var res = ''
                    res = '<p style="text-align:left">' + param[0].axisValue + '</p>';
                    for (var i = 0; i < param.length; i++) {
                        res += '<p style="text-align:left">' + param[i].marker + param[i].seriesName +"："+ param[i].value + '万人</p>';
                    }
                    return res
                }
            },
            series:series
        }
        dom.clear()
        dom.setOption(option, true);
    }

    function getTransportLunar(){
        var xArr = []
        for(var i = 0; i<=40; i++){
            switch(i){
                case 1:
                    xArr.push('1日')
                    break;
                case 2:
                    xArr.push('2日')
                    break;
                case 3:
                    xArr.push('3日')
                    break;
                case 4:
                    xArr.push('4日')
                    break;
                case 5:
                    xArr.push('5日')
                    break;
                case 6:
                    xArr.push('6日')
                    break;
                case 7:
                    xArr.push('7日')
                    break;
                case 8:
                    xArr.push('小年')
                    break;
                case 9:
                    xArr.push('9日')
                    break;
                case 10:
                    xArr.push('10日')
                    break;
                case 11:
                    xArr.push('11日')
                    break;
                case 12:
                    xArr.push('12日')
                    break;
                case 13:
                    xArr.push('13日')
                    break;
                case 14:
                    xArr.push('14日')
                    break;
                case 15:
                    xArr.push('除夕')
                    break;
                case 16:
                    xArr.push('春节');
                    break;
                case 17:
                    xArr.push('17日');
                    break;
                case 18:
                    xArr.push('18日');
                    break;
                case 19:
                    xArr.push('19日');
                    break;
                case 20:
                    xArr.push('20日');
                    break;
                case 21:
                    xArr.push('21日');
                    break;
                case 22:
                    xArr.push('22日');
                    break;
                case 23:
                    xArr.push('23日');
                    break;
                case 24:
                    xArr.push('24日');
                    break;
                case 24:
                    xArr.push('25日');
                    break;
                case 25:
                    xArr.push('26日');
                    break;
                case 26:
                    xArr.push('27日');
                    break;
                case 27:
                    xArr.push('28日');
                    break;
                case 28:
                    xArr.push('29日');
                    break;
                case 29:
                    xArr.push('30日');
                    break;
                case 30:
                    xArr.push('元宵');
                    break;
                case 31:
                    xArr.push('31日');
                    break;
                case 32:
                    xArr.push('32日');
                    break;
                case 33:
                    xArr.push('33日');
                    break;
                case 34:
                    xArr.push('34日');
                    break;
                case 35:
                    xArr.push('35日');
                    break;
                case 36:
                    xArr.push('36日');
                    break;
                case 37:
                    xArr.push('37日');
                    break;
                case 38:
                    xArr.push('38日');
                    break;
                case 39:
                    xArr.push('39日');
                    break;
                case 40:
                    xArr.push('40日');
                    break;
            }
        }
        return xArr
    }
})


// 三个图片轮播效果
$(function($){
    $.fn.extend({
        animateCss: function(animationName, callback) {
            var animationEnd = (function(el) {
                var animations = {
                    animation: 'animationend',
                    OAnimation: 'oAnimationEnd',
                    MozAnimation: 'mozAnimationEnd',
                    WebkitAnimation: 'webkitAnimationEnd',
                };

                for (var t in animations) {
                    if (el.style[t] !== undefined) {
                        return animations[t];
                    }
                }
            })(document.createElement('div'));

            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);

                if (typeof callback === 'function') callback();
            });
            return this;
        },
    });
    var history_move_param ={}, seven_day_flow_param = {}, history_top_continer_param = {};
    var history_chart_container = echarts.init(document.getElementById('history_move'))
    var seven_day_flow = echarts.init(document.getElementById('seven_day_flow'))
    var history_top_chart_container = echarts.init(document.getElementById('history_top'))
    $(window).resize(function(){
        history_chart_container.resize()
        seven_day_flow.resize()
        history_top_chart_container.resize()
    })
    
    var bottomSwitchArr = ["#history_move_container", '#seven_day', '#move_container', ]
    var bottomSwitchIndex = 0;
    var $current_obj = $('#history_move_container')
    var $next_obj = $('#seven_day')
    var bottomSwithInterval = setInterval(function() {
        // if (!flag6) return;
        bottomSwitchIndex %= 3
        
        $current_obj.animateCss('bounceOut', function() {
            $current_obj.addClass('hidden_t')
            $next_obj.removeClass('hidden_t').animateCss('bounceIn')

            $current_obj = $next_obj;
            var tmp_index = 0;
            tmp_index = (bottomSwitchIndex + 1) % 3
            $next_obj = $(bottomSwitchArr[tmp_index])
            // if (seven_day_flow_param) {
                setSevenDataChart(seven_day_flow_param)
                // setTimeout(function(){
                //     setSevenDataChart(seven_day_flow_param)
                // }, 200)
                // setSevenDataChart(seven_day_flow_param)
            // }
            // if (history_move_param) {
                set_history_move_chart(history_move_param.xArr, history_move_param.yArr)
                // setTimeout(function(){
                //     set_history_move_chart(history_move_param.xArr, history_move_param.yArr)
                // }, 200)
                // set_history_move_chart(history_move_param.xArr, history_move_param.yArr)
            // }
            // if (history_top_continer_param) {
                // setTimeout(function(){
                //     create_history_top_chart_body(history_top_continer_param.xArr, history_top_continer_param.yArr, history_top_continer_param.tem_yArr)
                // }, 200)
                create_history_top_chart_body(history_top_continer_param.xArr, history_top_continer_param.yArr, history_top_continer_param.tem_yArr)
                // create_history_top_chart_body(history_top_continer_param.xArr, history_top_continer_param.yArr, history_top_continer_param.tem_yArr)
            // }
        });
        
        bottomSwitchIndex += 1;
    }, 9 * 1000)

    create_history_move_chart()
    seven_day_flow_fun()
    create_history_top_chart()

    function create_history_move_chart() {
        var data = common_data['history_move']
        // $.ajax({
        //     url: '/analysis/capability?type=' + history_move_type,
        //     type: "GET",
        //     async: true,
        //     success: function(data) {
                var code = data.code;
                var message = data.message
                if (code != 0) {
                    return
                }
                $("#history_move_yesterday").text(format_year_month(data.data['record_date']))
                xArr = [], yArr = [];
                xArr.push('铁路出站')
                xArr.push('地铁')
                xArr.push('公交')
                xArr.push('出租车')
                xArr.push('社会停车场')

                yArr.push(get_k_num(data.data['train_get_off_num']))
                yArr.push(get_k_num(data.data['subway_p_in_station_num']))
                yArr.push(get_k_num(data.data['bus_p_num']))
                yArr.push(get_k_num(data.data['taxi_p_num']))
                yArr.push(get_k_num(data.data['park_p_num']))
                history_move_param['xArr'] = xArr
                history_move_param['yArr'] = yArr
                set_history_move_chart(xArr, yArr)
            // }
        // })
    }
    function get_k_num(num) {
        return (num / 10000).toFixed(1)
    }
    function set_history_move_chart(xArr, yArr) {
        var option = {
            title: {
                text: "客流量（万）",
                textStyle: {
                    fontWeight: 'normal', //标题颜色
                    color: 'white',
                    fontSize: 12
                }
            },
            // backgroundColor: 'rgba(0, 179, 234, 0.17)',
            legend: {
                data: ['人数'],
                textStyle: { //标题颜色
                    color: '#3398db',
                    fontSize: 15
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function(param) {
                    var res = ""
                    var bgcolor = param[0]['color']['colorStops'][1]['color'];
                    res += param[0].axisValue + "<br>"
                    res += '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + bgcolor + '"></span>'
                    res += param[0].value + "万"
                    return res;
                }
            },
            xAxis: {
                type: 'category',
                data: xArr,
                axisLabel: {
                    textStyle: {
                        color: 'white'
                    }
                },
                axisLabel: {
                    interval: 0,
                    rotate: 10,
                    align: 'center',
                    margin: 10
                },
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    },
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 12],
                    symbolOffset: [0, 10]
                },
            },
            yAxis: {

                axisTick: {
                    show: true
                },
                axisLabel: {
                    textStyle: {
                        color: 'white'
                    },
                    formatter: '{value} '
                },
                axisLine: {
                    lineStyle: {
                        color: 'white'
                    },
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 12],
                    symbolOffset: [0, 10]
                },
                splitLine: {
                    lineStyle: {
                        color: ['#00b3ea'],
                        type: 'dotted',
                        opacity: 0.4
                    }
                },
                splitNumber: 4
            },
            grid: {
                x: 40, //默认是80px
                y: 35, //默认是60px
                x2: 20, //默认80px
                y2: 30 //默认60px
            },

            series: [{
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 1, color: '#007fd0' },
                                        { offset: 0, color: '#1bffe6' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 1, color: '#cb0851' },
                                        { offset: 0, color: '#fc7cb5' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 1, color: '#ffc27a' },
                                        { offset: 0, color: '#fffacc' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 1, color: '#7eb550' },
                                        { offset: 0, color: '#e5ffc9' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 1, color: '#007fd0' },
                                        { offset: 0, color: '#1bffe6' }
                                    ]
                                ),
                                new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        { offset: 1, color: '#cb0851' },
                                        { offset: 0, color: '#fc7cb5' }
                                    ]
                                ),
                            ]
                            return colorList[params.dataIndex]
                        }
                    },
                },
                type: 'bar',
                data: yArr,
                barWidth: 20,
                animationDelay: function(idx) {
                    return idx * 100;
                },
                label: {
                    normal: {
                        show: true,
                        position: 'top',
                        textStyle: {
                            color: 'white'
                        }
                    }
                },
            }]
        };
        history_chart_container.clear()
        history_chart_container.setOption(option, true)
        history_chart_container.resize()
    }
    function format_year_month(record_data, year) {
        if (!year) {
            year = false;
        }
        if (!record_data) {
            return ""
        }
        var res = ""
        record_data = record_data.split('-')
        if (year) {
            res += record_data[0] + '年'
        }
        res += delete_zero(record_data[1]) + "月" + delete_zero(record_data[2]) + "日"
        return res
    }

    function delete_zero(str1) {
        str1 = str1 + ""
        return str1.substr(0, 1) == "0" ? str1.substr(1) : str1
    }

    //seven day flow
    function seven_day_flow_fun(){
        var data = common_data['seven_day_flow']
        if (data.code != 0) {
            return;
        }
        if (JSON.stringify(data.data['total']) == '{}') {
            return;
        }
        $('#legend_display').hide()
        var data = data.data['total'];
        var xArr = [];
        var yArr = [];
        for (var k in data) {
            xArr.push(k.slice(k.indexOf('-') + 1))
            yArr.push(Math.round(data[k]['in_num'] / 10000 * 10) / 10)
        }

        var param = {
            yTitle: '客流量(万人)',
            xArr: xArr,
            yArr: yArr,
            bgcolor: '#cb0851',
            obj: seven_day_flow,
            color: [new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 1, color: 'rgba(203,8,81,0.7)'},
                    {offset: 0, color: 'rgba(252,124,181,0.7)'}
                ]
            ), new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    {offset: 1, color: '#007fd0'},
                    {offset: 0, color: '#1bffe6'}
                ]
            )],
        }
        seven_day_flow_param = param
        setSevenDataChart(param)
    }
    
    function setSevenDataChart(param) {
        var bgcolor = param['bgcolor']
        var option = {
            title: {
                text: param.yTitle,
                textStyle: {
                    fontWeight: 'normal', //标题颜色
                    color: 'white',
                    fontSize: 12
                }
            },
            // backgroundColor: 'rgba(0, 179, 234, 0.17)',
            legend: {
                data: ['人数'],
                textStyle: { //标题颜色
                    color: '#3398db',
                    fontSize: 15
                }
            },
            xAxis: {
                type: 'category',
                data: param.xArr,
                axisLine: {
                    show: false,
                },
                axisLabel: {
                    interval: 0,
                    rotate: 10,
                    margin: 12,
                    align: 'center',
                    textStyle: {
                        color: 'white'
                    }
                }
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: ['#00b3ea'],
                        type: 'dotted',
                        opacity: 0.4
                    }
                }
            },
            grid: {
                x: 20, //默认是80px
                y: 35, //默认是60px
                x2: 20, //默认80px
                y2: 40 //默认60px
            },
            color: param.color,
            series: [{
                type: 'bar',
                data: param.yArr,
                barMaxWidth: 20,
                itemStyle: {
                    normal: {
                        barBorderRadius: [15, 15, 1, 1],
                        // color: function (params) {
                        //     if (params.name == '明天' || params.name == '后天' || params.name == '今天') {
                        //         return param.color[1]
                        //     } else {
                        //         return param.color[0]
                        //     }
                        // }
                        color: param.color[1]
                    }
                },
                label: {
                    show: true,
                    position: 'top',
                    //distance: 10,
                    color: 'white',
                    formatter: '{c}'
                },
                animationDelay: function(idx) {
                    return idx * 100;
                }
            }],
            animationEasing: 'elasticOut',
        }
        param.obj.clear();
        param.obj.setOption(option, true)
        param.obj.resize()
    }
    function format_year_month1(date) {
        var arr = date.split('-')
        return arr[0] + arr[1] + arr[2]
    }
    function create_history_top_chart() {
        var data = common_data['history_top_capa']
        // $.ajax({
        //     url: "/analysis/capability/peak",
        //     type: 'GET',
        //     async: true,
        //     success: function(data) {
                var code = data.code;
                var msg = data.message;
                if (code != 0) {
                    return
                }
                data = data.data
                var xArr = [],
                    yArr = [],
                    tem_yArr = []
                xArr.push(data.train.history.date)
                xArr.push(data.subway.history.date)
                xArr.push(data.train.annual.date)
                xArr.push(data.subway.annual.date)
                $('#history_train_top').text(format_year_month1(data.train.history.date))
                $('#history_subway_top').text(format_year_month1(data.subway.history.date))
                $('#annual_train_top').text(format_year_month1(data.train.annual.date))
                $('#annual_subway_top').text(format_year_month1(data.subway.annual.date))
                yArr.push(data.train.history.num)
                yArr.push(data.train.annual.num)
                yArr.push(data.subway.history.num)
                yArr.push(data.subway.annual.num)

                tem_yArr.push(data.train.history.num)
                tem_yArr.push(data.subway.history.num)
                tem_yArr.push(data.train.annual.num)
                tem_yArr.push(data.subway.annual.num)
                history_top_continer_param['xArr'] = xArr
                history_top_continer_param['yArr'] = yArr
                history_top_continer_param['tem_yArr'] = tem_yArr
                create_history_top_chart_body(xArr, yArr, tem_yArr)
            // }
        // })
    }

    function create_history_top_chart_body(xArr, yArr, tem_yArr) {
        var formatter = function(params) {
            var tmp = params[0].dataIndex ? 1 : 0
            var index1 = params[0].dataIndex + params[0].seriesIndex + tmp
            var index2 = params[1].dataIndex + params[1].seriesIndex + tmp
            var ah = '<div>' +
                '<div style="display: inline-block;vertical-align: middle">' +
                '<p>' + '铁路&nbsp&nbsp' + '<br>' +
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#01a276;"></span>' +
                format_year_month(xArr[index1], true) + " : " +
                tem_yArr[index1] + '万人</p>' +
                '<p>' + "地铁&nbsp&nbsp" + '<br>' +
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f0b400;"></span>' +
                format_year_month(xArr[index2], true) + " : " +
                tem_yArr[index2] + '万人</p>' +
                '</div></div>';
            return ah;
        }
        var labelSetting = {
            normal: {
                show: true,
                position: 'top',
                offset: [0, 0],
                textStyle: {
                    fontSize: 10,
                    color: '#49fffe'
                },
                formatter: function(params) {
                    var tmp = params.dataIndex ? 1 : 0
                    var index1 = params.dataIndex + params.seriesIndex + tmp
                    //format_year_month(xArr[index1], true)
                    return tem_yArr[index1] + '万'
                }
            }
        };

        var option = {
            // backgroundColor:'rgba(11, 43, 92, 0.4)',
            color: ['#01a276', '#f0b400', '#01a276', '#f0b400'],

            legend: {
                data: ['人数'],
                textStyle: { //标题颜色
                    color: '#3398db',
                    fontSize: 15
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: formatter
            },
            xAxis: {
                type: 'category',
                //
                data: ['历史最高', '年度最高'],
                interval: 0,
                axisLabel: {
                    margin: 24,
                    textStyle: {
                        color: '#49fffe'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'white'
                    },
                    symbol: ['none', 'arrow'],
                    symbolSize: [8, 12],
                    symbolOffset: [0, 10]
                },

            },
            yAxis: {
                // name:"客流量（万）",
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                axisLabel: {
                    show: false
                },
                splitLine: {
                    lineStyle: {
                        color: ['#00b3ea'],
                        type: 'dotted',
                        opacity: 0.4
                    }
                }
            },
            grid: {
                x: 10, //默认是80px
                y: 3, //默认是60px
                x2: 10, //默认80px
                y2: 48 //默认60px
            },

            series: [{
                    name: '',
                    data: yArr.slice(0, 2),
                    type: 'pictorialBar',
                    barCategoryGap: '-130%',
                    label: labelSetting,
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',

                    itemStyle: {
                        normal: {
                            // opacity: 0.5
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                },
                {
                    name: '',
                    type: 'pictorialBar',
                    data: yArr.slice(2),
                    barCategoryGap: '5%',
                    symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                    barGap: '-60%',
                    label: labelSetting,
                    itemStyle: {
                        normal: {
                            // opacity: 0.5
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                }
            ]
        };
        history_top_chart_container.clear()
        history_top_chart_container.setOption(option, true)
        history_top_chart_container.resize()
    }
})

function get_datestr_scope(type) {
    //获取请求的时间间隔 如 02:00 -- 次日两点. 按照24小时，按照天为1， 按照小时为2
    var res = {}
    var begin = ' 02:00:00';
    var curDate = new Date()
    if (type == 1) {
        var hour = curDate.getHours()
        if (hour < 2) {
            res.end_time = curDate.pattern('yyyy-MM-dd') + begin
            res.start_time = new Date(curDate.getTime() - 24 * 60 * 60 * 1000).pattern('yyyy-MM-dd') + begin
        } else {
            res.start_time = curDate.pattern('yyyy-MM-dd') + begin
            res.end_time = new Date(curDate.getTime() + 24 * 60 * 60 * 1000).pattern('yyyy-MM-dd') + begin
        }

    }
    if (type == 2) {
        res.start_time = new Date(curDate.getTime() - 60 * 60 * 1000).pattern('yyyy-MM-dd HH:mm:ss')
        res.end_time = curDate.pattern('yyyy-MM-dd HH:mm:ss')
    }
    return res
}

//数字滚动控制
function showRollNum(elem, n, scope_length) {
    // $(elem).empty()
    if (!scope_length) {
        scope_length = 21
    }
    if (String(n).length > 3) { n = toThousands(n) }
    var it = elem.find('i');
    var len = String(n).length;
    if (it.length > len) {
        elem.find('i').eq(len - 1).nextAll().remove()
    }
    for (var i = 0; i < len; i++) {
        if (it.length <= i) {
            if ((len - i) % 4 == 0) {
                elem.append("<i style='width:14px'></i>")
            } else {
                elem.append("<i></i>")
            }
        }
        var num = String(n).charAt(i);
        //根据数字图片的高度设置相应的值
        var y, obj = elem.find('i').eq(i);
        if (!isNaN(num)) {
            y = -parseInt(num) * scope_length;
            obj.animate({ 'background-position-x': '0', 'background-position-y': String(y) + 'px' }, 'slow', 'swing', function() {});
        } else {
            y = -parseInt(10) * scope_length;
            obj.css('background-position', '0 ' + String(y) + 'px');
        }
    }
}