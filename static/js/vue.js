// 定义一个组件， 组件之间的通信。

Vue.component('todo-item', {
    //全局组件
    template: '<li>item</li>'
})
var todoItem ={
    //local component
    template:'<li @click="handleClick">{{content}}</li>',
    props:['content', 'index'],
    methods:{
        handleClick:function() {
            this.$emit('delete', this.index)
        }
    }
}
var component_l = new Vue({
    el:'#component_split',
    components:{
        'todo-item':todoItem
    },
    data:{
        input_value:'hello world',
        list:[]
    },
    methods:{
        handleSubmit:function(){
            this.list.push(this.input_value)
            this.input_value = ""
        },
        handleDelete:function(index){
            this.list.splice(index)
            console.log(this.list)
        }
    }
})

var app1 = new Vue({
    el:'#app',
    data:{
        first_name:'wu',
        last_name:'ziling',
        title:'ziling vue learning',
        count:0
    },
    //计算属性
    computed:{
        full_name:function(){
            return this.first_name + ' ' + this.last_name
        }
    },
    //监听数据的变化，并在watch中做业务逻辑.
    watch:{
        full_name:function() {
            this.count ++
        }
        // first_name:function(){
        //     this.count ++
        // },
        // last_name:function() {
        //     this.count ++
        // }
    }
})

// v-if, v-show, v-for command
var app2 = new Vue({
    el:"#root",
    data:{
        show:true,
        list:[2, 2, 3],
        //map 
        map:{
            ziling: 1,
            wu:2
        }
    },
    methods:{
        handleClick:function(){
            this.show = !this.show
        }
    }
})

// todolist
var app3 = new Vue({
    el:"#todolist",
    data:{
        input_value:'hello world',
        list:[]
    },
    methods:{
        handleSubmit:function(){
            this.list.push(this.input_value)
            this.input_value = ""
        }
    }
})