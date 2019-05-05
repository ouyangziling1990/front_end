(function() {
    let data = [{
            "id": "1121324214353616898",
            "name": "流水段1",
            "_parentId": "1121324170229538817",
            "type": 1,
            "orderNo": 1,
            "positionType": "Segment",
            "positionName": "流水段",
            "code": "1.1.1.1",
            "buildingId": "1121323101562822657"
        },
        {
            "id": "1121324214382977026",
            "name": "流水段2",
            "_parentId": "1121324170229538817",
            "type": 1,
            "orderNo": 2,
            "positionType": "Segment",
            "positionName": "流水段",
            "code": "1.1.1.2",
            "buildingId": "1121323101562822657"
        },
        {
            "id": "1121324100583120897",
            "name": "1#楼",
            "_parentId": null,
            "type": 0,
            "orderNo": 1,
            "positionType": "Building",
            "positionName": "单体",
            "code": "1",
            "buildingId": "1121323101562822657"
        },
        {
            "id": "1121324133982363650",
            "name": "土建",
            "_parentId": "1121324100583120897",
            "type": 0,
            "orderNo": 1,
            "positionType": "Specialty",
            "positionName": "专业",
            "code": "1.1",
            "buildingId": "1121323101562822657"
        },
        {
            "id": "1121324170229538817",
            "name": "首层",
            "_parentId": "1121324133982363650",
            "type": 0,
            "orderNo": 1,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "1.1.1",
            "buildingId": "1121323101562822657"
        },
        {
            "id": "1121324170233733122",
            "name": "基础层",
            "_parentId": "1121324133982363650",
            "type": 0,
            "orderNo": 2,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "1.1.2",
            "buildingId": "1121323101562822657"
        },
        {
            "id": "1121324276836163585",
            "name": "2#楼",
            "_parentId": null,
            "type": 0,
            "orderNo": 2,
            "positionType": "Building",
            "positionName": "单体",
            "code": "2",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324360021794818",
            "name": "地上",
            "_parentId": "1121324276836163585",
            "type": 0,
            "orderNo": 1,
            "positionType": "None",
            "positionName": "自定义",
            "code": "2.1",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324360025989121",
            "name": "地下",
            "_parentId": "1121324276836163585",
            "type": 0,
            "orderNo": 2,
            "positionType": "None",
            "positionName": "自定义",
            "code": "2.2",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324421489319938",
            "name": "土建",
            "_parentId": "1121324360021794818",
            "type": 0,
            "orderNo": 1,
            "positionType": "Specialty",
            "positionName": "专业",
            "code": "2.1.1",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324476006883329",
            "name": "首层",
            "_parentId": "1121324421489319938",
            "type": 0,
            "orderNo": 1,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "2.1.1.1",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324476011077634",
            "name": "2F",
            "_parentId": "1121324421489319938",
            "type": 0,
            "orderNo": 2,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "2.1.1.2",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324476011077635",
            "name": "3F",
            "_parentId": "1121324421489319938",
            "type": 0,
            "orderNo": 3,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "2.1.1.3",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324476011077636",
            "name": "5F",
            "_parentId": "1121324421489319938",
            "type": 0,
            "orderNo": 4,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "2.1.1.4",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324476015271937",
            "name": "4F",
            "_parentId": "1121324421489319938",
            "type": 0,
            "orderNo": 5,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "2.1.1.5",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324476015271938",
            "name": "6F",
            "_parentId": "1121324421489319938",
            "type": 0,
            "orderNo": 6,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "2.1.1.6",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324476019466242",
            "name": "7F",
            "_parentId": "1121324421489319938",
            "type": 0,
            "orderNo": 7,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "2.1.1.7",
            "buildingId": "1121323148933292033"
        },
        {
            "id": "1121324476019466243",
            "name": "8F",
            "_parentId": "1121324421489319938",
            "type": 0,
            "orderNo": 8,
            "positionType": "Floor",
            "positionName": "楼层",
            "code": "2.1.1.8",
            "buildingId": "1121323148933292033"
        }
    ];
    window.flatData = window.flatData || {};
    window.flatData.data = data
})()