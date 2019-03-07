// 题目四
function stringNumber(str) {
    var obj = {}
    for (var i = 0; i < str.length; i++) {
        var chart = str[i]
        var tmp = obj[chart]
        if (!tmp) {
            obj[chart] = 1
        } else {
            obj[chart] = ++tmp
        }
    }
    var max_chart, max = 0;
    for (var x in obj) {
        if (max < obj[x]) {
            max = obj[x]
            max_chart = x
        }
    }
    console.log('出现频率最高的 ' + max_chart + "  出现次数 " + max)
}
//扩充method
String.prototype.stringNumber = function() {
    var obj = {}
    for (var i = 0; i < this.length; i++) {
        var chart = this[i]
        var tmp = obj[chart]
        if (!tmp) {
            obj[chart] = 1
        } else {
            obj[chart] = ++tmp
        }
    }
    var max_chart, max = 0;
    for (var x in obj) {
        if (max < obj[x]) {
            max = obj[x]
            max_chart = x
        }
    }
    console.log('出现频率最高的 ' + max_chart + "  出现次数 " + max)
}

main()

function main() {
    stringNumber('ziling')
    'ziling'.stringNumber()
}


// 题目7
var add = (function() {
    var args = arguments;
    var that = this;
    this.sum = 0;
    return {
        add: function(num1, num2) {
            if (num1) {
                that.sum += num1
            }
            if (num2) {
                that.sum += num2
            }
            console.log(that.sum)
            return that.sum
        }
    }
}())
add.add(1, 3)
add.add(4)

var add2=function(){
    var sum = 0;
    function inner(){
        sum++
        console.log("add2: " + sum)
    }
    return inner;
}
var fn = add2()
fn()
fn()
// 题目8
function removeDuplicateObj(arr) {
    var tmpobj = {}
    arr.forEach(function(item) {
        var key = item['name']
        if (!tmpobj[key]) {
            tmpobj[key] = item;
        }
    })
    console.log(tmpobj)
    var arr_new = Object.values(tmpobj)
    var x = arr_new.sort(function(a, b) {
        var key1 = a['id']
        var key2 = b['id']
        return key1 - key2
    })
    console.log(x)
}
var arr = [{ id: 15, name: 'jeff' }, { id: 2, name: 'Dave' }, { id: 3, name: 'jeff' }, { id: 5, name: 'shely' }]
removeDuplicateObj(arr)