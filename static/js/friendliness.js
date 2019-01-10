$(function($){
    $(function  () {
      $("ol.example").sortable();
    });


    add_no_carousel_event()
    function add_no_carousel_event(){
        $("#exclude_station").on('click','.add_station', function(){
            var li = $(this).prev()
            var name = li.text()
            var id = li.attr('data_id')
            station_html_add(id, name)
            $(this).parent().remove()
        })
        
    }
    function station_html_add(id, name){
        var $div = $('<div></div>')
        $div.append($('<li></li>').text(name).attr('data_id', id))
        .append('<span title="上移" class="move_up"></span>')
        .append('<span title="下移" class="move_down"></span>')
        .append('<span class="btn-delete" title="取消轮播"></span>')
        $("#include_station").append($div)
    }
    add_carousel_event()
    function add_carousel_event(){
        $('#include_station').on('click', '.btn-delete', function(){
            var parent = $(this).parent()
            var li = parent.find('li')
            var name = li.text()
            var id = li.attr('data_id')
            station_html_no_add(id, name)
            parent.remove()

        })
        $('#include_station').on('click', '.move_up', function(){
            var parent = $(this).parent()
            var prev = parent.prev()
            if(prev.length == 0){
                alert('已经移动到了第一个轮播调度站了')
                return
            }
            prev.before(parent)
        })
        $('#include_station').on('click', '.move_down', function(){
            var parent = $(this).parent()
            var next = parent.next()
            if(next.length == 0){
                alert('已经移动到了最后一个轮播调度站了')
                return
            }
            next.after(parent)
        })
    }
    function station_html_no_add(id, name){
        var $div = $('<div></div>')
        $div.append($('<li></li>').text(name).attr('data_id', id))
        .append('<span class="add_station" title="加入轮播"></span>')
        $("#exclude_station").append($div)
    }
})