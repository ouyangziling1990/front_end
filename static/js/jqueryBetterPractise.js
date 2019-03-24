/**
* author: ziling
* date: 2019-03-24
*/



$(function($){
	//订阅者和发布者模式。
	doSomething()
	$("body").on("do_Something_Else", function(){
		doSomethingElse()
	})
	dosubthing()
	function doSomething(){
		// doSomethingElse()
		// doOneMoreThing()
	}

	function doSomethingElse(){
		console.log("do some thing else")
	}
	function doOneMoreThing(){
		console.log("do one more thing")
	}

	// 订阅者模式
	function dosubthing(){
		$("body").trigger("do_Something_Else")
	}
	
})

$(function(){
	// ajax deferred， when 对象。
	var param = {
		url:'http://192.168.1.31:1234/system/menusystem',
		type:'GET'
	}
	$.ajax(param)
	.done(function(){
		console.log("menusystem ids")
	})
	.fail(function(res){
		console.log(res)
		console.error("menusystem error")
	})
	.always(function(res){
		console.log("always done")
		console.log(res)
	})

	// 
})

//deferred 对象的一般运用
$(function(){
	var wait = function(dtd){
		var dtd = $.Deferred()
		var tasks = function(){
			console.log("tasks, 执行完毕")
			dtd.resolve()
		}
		setTimeout(tasks, 2000)
		return dtd.promise();
	}

	$.when(wait())
	.done(function(){
		console.log("when success")
	})
	.fail(function(){
		console.error("when error")
	})
	.always(function(){
		console.log("when always")
	})

})