jQuery(function($) {
    function con(i) {
        console.log(i)
    }
    var intervals = []
    for (var i = 0; i < 4; i++) {
        var tmp = createInterval(con, i, 1000)
        intervals.push(tmp)
    }

    setTimeout(function(){
        intervals.forEach(function(e){
            clearInterval(e)
        })
    }, 3*1000)


    function createInterval(f, dynamicParameter, interval) {
        var int = setInterval(function() { 
            f(dynamicParameter);
        }, interval);
        return int;
    }
})