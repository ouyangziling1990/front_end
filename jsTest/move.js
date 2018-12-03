function move(obj, json, fn){
	
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var flag = true;
		for(var attr in json){
			var pValue = 0;
			//获取值
			if(attr == 'opacity'){
				pValue = Math.round(parseFloat(getStyle(obj, attr))*100);
			}else{
				pValue = parseInt(getStyle(obj, attr));
			}

			//获取速度
			var speed = (json[attr] - pValue)/8;
			speed = speed > 0 ? Math.ceil(speed): Math.floor(speed);
			
			//如果有效果未完成，则整体设置为false。 
			if(pValue != json[attr]){
				flag = false;
			}

			if(attr == 'opacity'){
				obj.style.filter = 'alpha(opacity:'+pValue+speed+')';//ie
				obj.style.opacity = (pValue+speed)/100;
			}else{
				obj.style[attr] = pValue + speed +'px';
			}

			if(flag){
				clearInterval(obj.timer);
				if(fn){
					fn();
				}
			}	
			
		}
		
	}, 50);
}

function getStyle(obj, attr) {
	if(obj.currentStyle)return obj.currentStyle[attr];//for ie
	else return getComputedStyle(obj, false)[attr];// for firefox
}