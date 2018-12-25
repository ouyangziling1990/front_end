jQuery(function($){
    var obj = echarts.init(document.getElementById('autoEchart'))
    var pie_obj = echarts.init(document.getElementById('pie'))
    var radar = echarts.init(document.getElementById('radar'))
    window.onresize = resize;
    function resize(){
        obj.resize()
        pie_obj.resize()

    }
    bar_fun()
    pie_fun()
    radar_fun()

    function radar_fun(){
        var option={
            radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                       }
                    },
                    axisLine:{
                        show:false  
                    },
                    splitArea:{
                        areaStyle:{
                            color:['#033363', '#134266']
                        }
                    },
                    indicator: [
                       { name: '社会车辆', max: 16000},
                       { name: '地铁', max: 30000},
                       { name: '出租车', max: 38000},
                       { name: '公交', max: 52000},
                       { name: '机场巴士', max: 25000}
                    ]
                },
                series: [{
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    data : [
                        {
                            value : [10000, 28000, 35000, 50000, 1000],
                            name : '预算分配（Allocated Budget）',
                            areaStyle:{
                                normal:{
                                    color:'#648143'
                                }
                            },
                            lineStyle:{
                                color:'red',
                                width:'5',
                            },
                            label:{
                                show:true,
                                // position: 'top'
                            }
                        }
                    ],
                }]
        }
        radar.clear()
        radar.setOption(option, true)
    }
    function pie_fun(){
        var option = {
            color:['blue'],
            series: [
            {
                    type:'pie',
                    radius:['70%', '100%'],
                    data:[{
                        value:2, name:'1'
                    }],
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    label: {
                        normal: {
                            show: false,
                        },
                    },
                },
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: true,
                            position: 'center',
                            fontSize: '20',
                            fontWeight:'bold'
                        }
                    },
                    color:[
                        {
                          type: 'linear',
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [{
                            offset: 0,
                            color: '#ffffff'
                          }, 
                          {offset: 0.1,
                            color: '#ffffff'},
                            
                          {
                            offset: 1,
                            color: '#2e80b4'
                          }]
                        },
                        {
                          type: 'linear',
                          x: 1,
                          y: 0,
                          x2: 0,
                          y2: 0,
                          colorStops: [{
                            offset: 0,
                            color: '#2EB87F'
                          }, {
                            offset: 1,
                            color: '#2e80b0'
                          }]
                        },
                    ],
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'2,341'},
                        {value:310, name:' '},
                        
                    ]
                },
                
            ]
        };
        pie_obj.clear()
        pie_obj.setOption(option, true)
    }
    function bar_fun(){
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
    }
    
})