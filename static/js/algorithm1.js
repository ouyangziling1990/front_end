
var initData = initArray()
var g_tmp = []
g_tmp[0] = initData;
console.log(initData)
console.log("第一年的情况")
var year_1 = year_order(1)
console.log(year_1)


console.log("第2年的情况")
console.log(year_order(2))
// var init_year = initZeroArray();
// for(var i = 0; i<8; i++){
// 	for(var j = 0; j<10; j++){
// 		var v = change(i, j, year_1)
// 		if(v == 2){
// 		}
// 		init_year[i][j] = v;
// 	}
// }
// console.log(init_year)
console.log("第3年的情况")
console.log(year_order(3))

function year_order(year_index){
	
	for(var i = 0; i<year_index; i++){
		var init_year = initZeroArray();
		year_change(init_year, year_index)
	}
	function year_change(init_year, year_index){
		for(var i = 0; i<8; i++){
			for(var j = 0; j<10; j++){
				var v = change(i, j, g_tmp[year_index-1])
				if(v == 2){
				}
				init_year[i][j] = v;
			}
		}
		g_tmp[year_index] = init_year;
	}
	return g_tmp[year_index];
}
function initArray(){
	var domain = []
	domain.push(new Array(10).fill(0))
	domain.push(new Array(10).fill(0))
	domain.push(new Array(10).fill(0))
	domain.push([0,0,0,2,1,2,1,0,0,0])
	domain.push([0,0,0,1,2,1,2,0,0,0])
	domain.push(new Array(10).fill(0))
	domain.push(new Array(10).fill(0))
	domain.push(new Array(10).fill(0))
	return domain
}
function initZeroArray(){
	var domain = []
	var init = new Array(10).fill(0)
	for(var i =0; i<8; i++){
		domain.push(new Array(10).fill(0))
	}
	return domain
}
/*
	@params i, array 的第一维度
	@params j, array 的第二维度
	@params array， 二维数组的索引

*/
function change(i,j,array){
	var v = 0;
	var value = array[i][j]
	if(value){
		v = value - 1; 
		return v
	}
	var top=right=bottom=left =0;
	if( j-1 >= 0){
		top = array[i][j-1]
	}
	if(j+1 <10){
		bottom = array[i][j+1]
	}
	if(i-1>=0){
		left = array[i-1][j]
	}
	if(i+1<8){
		right = array[i+1][j]
	}
	if(top == 2 || right == 2 || bottom == 2 || left ==2){
		v = 2;
	}
	return v;
}