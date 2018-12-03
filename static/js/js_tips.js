//1.date 日期排序
//
var rData = resData.sort(function (a, b) {
    var at = a.time,bt = b.time;
    at = at.replace('-','/'),bt = bt.replace('-','/');
    at = new Date(at),bt = new Date(bt);
    return bt.getTime() -at.getTime()
});