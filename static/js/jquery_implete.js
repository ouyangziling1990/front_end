console.log('the work begin')

function jQuery1(selector) {
	this.find = function(selector){
		return document.getElementsByTagName(selector);
	}
	this.html = function(htmlText){
		console.log(htmlText)
	}

	var elems = this.find(selector)
	for(var i = 0; i < elems.length; i++) {
		this[i] = elems[i]
	}
	this.length = elems.length;
	return this
}

function jQuery2(selector){
	var elems = jQuery.prototype.find(selector)
	for(var i = 0; i<elems.length; i++){
		this[i] = elems[i]
	}
	this.length = elems.length

	jQuery.prototype.find = function(selector){
		return document.getElementsByTagName(selector)
	}
	jQuery.prototype.html = function(htmlText){
		console.log(htmlText)
	}
}
(function(window) { //用立即执行函数把所有代码都封装起来
    
    //为了更好理解和测试，我们粗略地把代码细节都补全
    function jQuery(selector) {
        var elems = jQuery.prototype.find(selector); //调用原型上的find方法，获取符合条件的目标元素。
        for (var i = 0; i < elems.length; i++) {
            this[i] = elems[i]; //把目标元素存入对应的索引值属性内。
        }
        this.length = elems.length; //类数组必须有索引值属性以及length属性
        return this
    }
 
    jQuery.prototype = { //为jQuery函数重新定义一个新对象作为原型
        
        constructor : jQuery, //添加construtor属性
        
        find : function(selector) { //定义选择器模块的find方法
            return document.getElementsByTagName(selector); //旨在方便理解，暂时只简单实现getElementsByTagName的功能
        },
 
        html : function(htmlText) { //定义选择器模块的find方法
            console.log(htmlText); //先不具体实现功能，只简单打印参数，旨在理解整体结构而不用分心到具体细节的实现上
        }
    };
 
    window.jQuery = jQuery; //把构造函数暴露在全局
 
})(window);//把window对象作为参数传递给立即执行函数，以便在局部作用域保留window的引用，加快运行速度
