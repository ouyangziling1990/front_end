(function() {
    'use strict';
    var FlatHierarchy = function() {
        this.init();
    };
    FlatHierarchy.prototype = {
        init: function() {
            if (window.flatData) {
                this.flatData = window.flatData.data
            } else {
                console.error('data is null')
            }
            this.count = 0;
        },
        recursion: function() {
            let arr = [];
            let flatData = JSON.parse(JSON.stringify(this.flatData))
            flatData.forEach((ele, index) => {
                if (ele._parentId === null || ele._parentId == "") {
                    arr.push(ele)
                    let pId = ele.id
                    let tmp = this.checkChildNode(ele, flatData, pId)
                    ele.children = tmp
                }
            })
            console.log(arr)
        },
        checkChildNode: function(ele, arr, pId) {
            let currentArr = []
            arr.forEach((ele, index) => {
                if (ele._parentId == pId) {
                    currentArr.push(ele)
                    let tmp = this.checkChildNode(ele, arr, ele.id)
                    if (tmp.length > 0) {
                        ele.children = tmp
                    }
                }
            })
            return currentArr;
        },
        flatWay: function() {
            //明白有几层结构循环几次
            let arr = []
            let flatData = JSON.parse(JSON.stringify(this.flatData))
            flatData.forEach((ele, index) => {
                if (ele._parentId === null) {
                    arr.push(ele)
                }
            })
            arr.forEach((ele, index) => {
                let id = ele.id;
                flatData.forEach((ele1, index1) => {
                    if (ele1._parentId == id) {
                        ele.children = ele.children || [];
                        ele.children.push(ele1)
                    }
                })
            })
            arr.forEach((ele, index) => {
                ele.children.forEach((ele1, index1) => {
                    let id = ele1.id;
                    flatData.forEach((ele2, index2) => {
                        if (ele2._parentId == id) {
                            ele1.children = ele1.children || []
                            ele1.children.push(ele2)
                        }
                    })
                })
            })
            console.log(this.flatData)
            return arr
        }
    }
    window.flatData.FlatHierarchy = new FlatHierarchy();
})();