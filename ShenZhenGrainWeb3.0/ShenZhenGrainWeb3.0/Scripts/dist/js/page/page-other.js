// 页面一，四，六数据查询  ....    页面二
$(document).ready(function () {
    //页面一数据查询
    $.ajax({
        type: "post",
        url: "/GrainTemp/tempQueryView1",
        data: { warehouseType : "type" },
        success: function (response) {
            var str = response;
            var strs = new Array();
            strs = str.split(";")
            //平方仓
            var temp1 = strs[0].split(",")[0];
            var temp2 = strs[0].split(",")[1];
            var temp3 = strs[0].split(",")[2];
            //筒仓
            var temp4 = strs[1].split(",")[0];
            var temp5 = strs[1].split(",")[1];
            var temp6 = strs[1].split(",")[2];
            //平房仓
            var temp7 = strs[2].split(",")[0];
            var temp8 = strs[2].split(",")[1];
            var temp9 = strs[2].split(",")[2];
            //气膜仓
            var temp10 = strs[3].split(",")[0];
            var temp11 = strs[3].split(",")[1];
            var temp12 = strs[3].split(",")[2];
            $("#temp1").text("平均温度：" + temp3 + "℃," + "最高温度：" + temp1 + "℃," + "最低温度：" + temp2 + "℃.");
            $("#temp2").text("平均温度：" + temp6 + "℃," + "最高温度：" + temp4 + "℃," + "最低温度：" + temp5 + "℃.");
            $("#temp3").text("平均温度：" + temp9 + "℃," + "最高温度：" + temp7 + "℃," + "最低温度：" + temp8 + "℃");
            $("#temp4").text("平均温度：" + temp12 + "℃," + "最高温度：" + temp10 + "℃," + "最低温度：" + temp11 + "℃");
        }
    });
    //页面四数据查询
    $.ajax({
        type: "post",
        url: "/GrainTemp/tempQueryView4",
        data: { warehouseid: "W000000001" },
        success: function (response) {
            var str = response;
            var strs = new Array();
            strs = str.split(",")
            var info0 = strs[0];
            var info1 = strs[1];
            var info2 = strs[2];
            var info3 = strs[3];
            var info4 = strs[4];
            var info5 = strs[5];
            var info6 = strs[6];
            var info7 = strs[7];
            var info8 = strs[8];
            var info9 = strs[9];
            var info10 = strs[10];
            var info11 = strs[11];
            var info12 = strs[12];
            $("#warehouseName_1").text(info0);
            $("#guardianName_1").text(info1);
            $("#warehouseType_1").text(info2);
            $("#content_1").text(info3);
            $("#productplace_1").text(info4);
            $("#receiveDate_1").text(info5);
            $("#inputdate_1").text(info6);
            $("#inputType_1").text(info7);
            $("#moisture_1").text(info8);
            $("#incomplete_1").text(info9);
            $("#warehouseLevel_1").text(info10);
            $("#capacity_1").text(info11);
            $("#impurity_1").text(info12);
        }
    });
    //页面六数据查询
    $.ajax({
        type: "post",
        url: "/GrainTemp/tempQueryView6",
        data: { warehouseid: "W000000002" },
        success: function (response) {
            var str = response;
            var strs = new Array();
            strs = str.split(",")
            var info0 = strs[0];
            var info1 = strs[1];
            var info2 = strs[2];
            var info3 = strs[3];
            var info4 = strs[4];
            var info5 = strs[5];
            var info6 = strs[6];
            var info7 = strs[7];
            var info8 = strs[8];
            var info9 = strs[9];
            var info10 = strs[10];
            var info11 = strs[11];
            var info12 = strs[12];
            $("#warehouseName_2").text(info0);
            $("#guardianName_2").text(info1);
            $("#warehouseType_2").text(info2);
            $("#content_2").text(info3);
            $("#productplace_2").text(info4);
            $("#receiveDate_2").text(info5);
            $("#inputdate_2").text(info6);
            $("#inputType_2").text(info7);
            $("#moisture_2").text(info8);
            $("#incomplete_2").text(info9);
            $("#warehouseLevel_2").text(info10);
            $("#capacity_2").text(info11);
            $("#impurity_2").text(info12);
        }
    });
    //页面八数据查询
    $.ajax({
        type: "post",
        url: "/GrainTemp/tempQueryView8",
        data: { warehouseid: "W000000001" },
        success: function (response) {
            var str = response;
            var strs = new Array();
            strs = str.split(",")
            var info0 = strs[0];
            var info1 = strs[1];
            var info2 = strs[2];
            var info3 = strs[3];
            var info4 = strs[4];
            var info5 = strs[5];
            var info6 = strs[6];
            var info7 = strs[7];
            var info8 = strs[8];
            var info9 = strs[9];
            var info10 = strs[10];
            var info11 = strs[11];
            var info12 = strs[12];
            $("#warehouseName_3").text(info0);
            $("#guardianName_3").text(info1);
            $("#warehouseType_3").text(info2);
            $("#content_3").text(info3);
            $("#productplace_3").text(info4);
            $("#receiveDate_3").text(info5);
            $("#inputdate_3").text(info6);
            $("#inputType_3").text(info7);
            $("#moisture_3").text(info8);
            $("#incomplete_3").text(info9);
            $("#warehouseLevel_3").text(info10);
            $("#capacity_3").text(info11);
            $("#impurity_3").text(info12);
        }
    });
    //页面九数据查询
    $.ajax({
        type: "post",
        url: "/GrainTemp/tempQueryView9",
        data: { warehouseid: "W000000001" },
        success: function (response) {
            var str = response;
            var strs = new Array();
            strs = str.split(",")
            var info0 = strs[0];
            var info1 = strs[1];
            var info2 = strs[2];
            var info3 = strs[3];
            var info4 = strs[4];
            var info5 = strs[5];
            var info6 = strs[6];
            var info7 = strs[7];
            var info8 = strs[8];
            var info9 = strs[9];
            var info10 = strs[10];
            var info11 = strs[11];
            var info12 = strs[12];
            $("#warehouseName_4").text(info0);
            $("#guardianName_4").text(info1);
            $("#warehouseType_4").text(info2);
            $("#content_4").text(info3);
            $("#productplace_4").text(info4);
            $("#receiveDate_4").text(info5);
            $("#inputdate_4").text(info6);
            $("#inputType_4").text(info7);
            $("#moisture_4").text(info8);
            $("#incomplete_4").text(info9);
            $("#warehouseLevel_4").text(info10);
            $("#capacity_4").text(info11);
            $("#impurity_4").text(info12);
        }
    });
    $("#detail").hide();
    $("#ret").hide();
    //页面二数据查询
    $("#pf1Temp").click(function () {
        query2_0();
    });
    $("#pf2Temp").click(function () {
        alert("暂无数据");
    });
    $("#click1").click(function () {
        //alert("点击成功1");
        $("div #view-1").removeClass("active");
        $("div #view-2").addClass("active");
        //$("#col-md-12").append("<p><button type='button' class='btn btn-default btn-lg' id='pfTemp'>平方仓温度展示</button></p>")
        //$("a #img1").removeClass("active");
        //$("a #img2").removeClass("active");
    });
    $("#detail").click(function () {
        $("div #view-2").removeClass("active");
        $("div #view-5").addClass("active");
    });
    $("#ret").click(function () {
        var str = $("#testid").val();
        query2_3(str);
        $("div #view-5").removeClass("active");
        $("div #view-2").addClass("active");
    });
});
