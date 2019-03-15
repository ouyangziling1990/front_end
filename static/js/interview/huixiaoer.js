//  1
console.log("题目1")
console.log('hello'+(1<2)?"world":"me");

//2

console.log("题目2")
var a = b = 1;
(function(){
    var a = b = 2;
})();
console.log(a, b)

console.log("题目3")
if([] instanceof Object){
    console.log(typeof null)
}else{
    console.log(typeof undefined)
}

console.log("题目4")
var obj ={}; 
obj.name='first';
var peo = obj;
peo.name='second'
console.log(obj.name)
console.log("题目5")
function say(word){
    try{
        let word = 'hello'
        console.log(word)
    }catch(e){
        console.err(e)
    }
    
}
say('hello Lili')

console.log("题目6")
console.log('ABCD')
console.log("题目7")
console.log('CD')
console.log("题目8")
for(var i = 0; i<5; i++){
    setTimeout(function(){
        console.log(i)
    }, 1000)
}
console.log(i)
console.log("题目9")
function fun(n, o){
    console.log(o)
    return{
        fun:function(m){
            return fun(m,n)
        }
    }
}
var b = fun(0).fun(1).fun(2).fun(3);

console.log("题目10")
console.log("题目11")
console.log("题目12")
console.log("题目13")
console.log("题目14")
console.log("题目15")