jQuery(function($) {
    function con(i) {
        console.log(i)
    }
    for (var i = 0; i < 4; i++) {
        createInterval(con, i, 1000)
    }

    function createInterval(f, dynamicParameter, interval) {
        setInterval(function() { 
            f(dynamicParameter);
        }, interval);
    }
})