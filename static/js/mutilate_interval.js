jQuery(function($) {
    function con(i) {
        console.log(i)
    }
    var intervals = []
    for (var i = 0; i < 4; i++) {
        var tmp = createInterval(con, i, 1000)
        intervals.push(tmp)
    }

    setTimeout(function() {
        intervals.forEach(function(e) {
            clearInterval(e)
        })
    }, 3 * 1000)


    function createInterval(f, dynamicParameter, interval) {
        var int = setInterval(function() {
            f(dynamicParameter);
        }, interval);
        return int;
    }

    // 递归setTimeout替代interval
    function interval(func, w, t, params) {
        var interv = function() {
            if (typeof t === "undefined" || t-- > 0) {
                setTimeout(interv, w);
                try {
                    func.call(null, params)
                } catch (e) {
                    t = 0;
                    throw e.toString();
                }
            }
        };

        setTimeout(interv, w);
    };
    var timeoutShow = document.getElementById('timeoutShow')
    var index = 0;
    var params = {'index':0}
    interval(function(params) {
        timeoutShow.innerHTML = ++params.index
    }, 1000, undefined, params);

})