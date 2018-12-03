//created by ziling @2017/11/06  日期格式化
//var a = new Date();  var str = a.pattern("yyyy-MM-dd HH:mm:ss:S");
Date.prototype.pattern=function(fmt) {
    var o = {
        "M+" : this.getMonth()+1, //月份
        "d+" : this.getDate(), //日
        "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时
        "H+" : this.getHours(), //小时
        "m+" : this.getMinutes(), //分
        "s+" : this.getSeconds(), //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S" : this.getMilliseconds() //毫秒
    };
    var week = {
        "0" : "/u65e5",
        "1" : "/u4e00",
        "2" : "/u4e8c",
        "3" : "/u4e09",
        "4" : "/u56db",
        "5" : "/u4e94",
        "6" : "/u516d"
    };
    if(/(y+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    if(/(E+)/.test(fmt)){
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);
    }
    for(var k in o){
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
}

//引入JS文件
function includeJs(path){ 
    var a=document.createElement("script");
    a.type = "text/javascript"; 
    a.src=path; 
    var head=document.getElementsByTagName("head")[0];
    head.appendChild(a);
}

//day of the week
// dateStr字符串格式, 2018-09-19
function dayOfWeek(dateStr) {

    let dayIndex = new Date(dateStr).getDay()
    let weekNum = ''
    switch(dayIndex){
        case 0:
            weekName = '周日'
            break
        case 1:
            weekName = '周一'
            break
        case 2:
            weekName = '周二'
            break
        case 3:
            weekName = '周三'
            break
        case 4:
            weekName = '周四'
            break
        case 5:
            weekName = '周五'
            break
        case 6:
            weekName = '周六'
            break
        default:
            break
    }
    return weekName;
}

//间隔天数
// dateStr1, dateStr2 格式，2018-09-08
function dayScope(dateStr1, dateStr2) {
    return parseInt((new Date(dateStr1) - new Date(dateStr2))/1000/24/60/60)
}
//千分位转换
function toThousands(num) {
    var flag = 1;
    if(num < 0){
        flag = -1;
        num = Math.abs(num)
    }
    let arr = String(num).split('.')
    let decimals = 0
    if(arr.length > 1){
        decimals = arr[1]
        num = arr[0]
    }
    var result = '', counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) { 
            result = ',' + result;
        }
    }
    if(arr.length > 1){
        result += "." + decimals
    }
    if(flag == -1){
        result = '-' + result
    }
    return result
}
/*
该函数用来解析来自URL的查询串中的name=value参数对儿，
他将name=value对存储在一个对象的属性中，并返回该对象
使用方式
var args = urlArgs();
var q = args.q || "";// 如果参数定义了的话就使用参数，否则拒使用一个默认值
var n = args.n ? parseInt(args.n) : 10; 
*/
function urlArgs() {
    var args = {}
    var query = location.search.substring(1);
    var pairs = query.split('&');
    for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=')
        if(pos == -1) continue;
        var name = pairs[i].substring(0, pos);
        var value = pairs[i].substring(pos+1);
        value = decodeURIComponent(value)
        args[name] = value;
    }
    return args;
}

// 作为一个对象的w和h属性返回视口的尺寸
function getViewportSize(w){
    w = w|| window;
    // 除了IE8 及更早的版本以外，其他浏览器都能用
    if(w.innerWidth != null){
        return {w: w.innerWidth, h: w.innerHeight}
    }

    //对标准模式下的IE
    var d = w.document;
    if(document.compatMode == 'CSS1Compat'){
        return {w: d.documentElement.clientWidth,
                h: d.documentElement.clientHeight }
    }
    return {w: d.body.clientWidth, h: d.body.clientHeight}
}

// 以一个对象的x和y属性的方式返回滚动条的偏移量
function getScrollOffsets(w) {
    w = w||window

    //除了IE8及更早的版本，其他浏览器都能用
    if(w.pageXOffset != null) {
        return {x: w.pageXOffset, y:w.pageYOffset}
    }
    //对标准模式下的IE
    var d = w.document;
    if(document.compatMode == "CSS1Compat"){
        return {x:d.documentElement.scrollLeft, y:d.documentElement.scrollTop}
    }
    return {x: d.body.scrollLeft, y:d.body.scrollTop}
}