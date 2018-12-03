jQuery(function($){
    var obj = echarts.init(document.getElementById('autoEchart'))
    var option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        grid: {
            left: '40',
            right: '20',
            bottom: '20',
            top: '20',
            // containLabel: true
        },
        barMaxWidth: 20,
        series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
        }]
    };
    obj.clear();
    obj.setOption(option, true);
})