// 页面五折线图数据查询
function ajaxT() {
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/GrainTemp/tempQueryView12",
        data: { id: document.getElementById("testid").value },
        success: function (data) {
            createShowingTable(data);
            $("#detail").hide();
            $("#ret").show();
        }
    }
);
}
function createShowingTable(data) {
    var tableStr = "<table border='8' style='margin: 0 auto;height:50%'>";
    tableStr = tableStr
            + "<thead border='8'>"
            + "<tr><th colspan='9' class='tablehead'style='text-align:center;'>" + document.getElementById("testid").value + "</th></tr>"
            + "<tr>"
            + "<th colspan='3' class='tablehead'style='text-align:center' >第一层</th>"
            + "<th colspan='3' class='tablehead'style='text-align:center' >第二层</th>"
            + "<th colspan='3' class='tablehead'style='text-align:center' >第三层</th>"
            + "</tr>"
             + "<tr class='tablehead'style='text-align:center'>"
             +"<td>第一缆</td>"
             +"<td>第二缆</td>"
             +"<td>第三缆</td>"
             +"<td>第一缆</td>"
             +"<td>第二缆</td>"
             +"<td>第三缆</td>"
             +"<td>第一缆</td>"
             +"<td>第二缆</td>"
             +"<td>第三缆</td>"
            + "</tr>"
            + "</thead>";
    var len = data.length;
    for (var i = 0; i < len; i++) {
        tableStr = tableStr + "<tr>"
                //+ "<td>" + (i + 1) + "</td>"
                //+ "<td><input class='check' id='checkOne' name='checkOne' type='checkbox' value='" + data[i].key + "' /></td>"
                + "<td>" + data[i].temp1 + "℃</td>"
                + "<td>" + data[i].temp2 + "℃</td>"
                + "<td>" + data[i].temp3 + "℃</td>"
                + "<td>" + data[i].temp4 + "℃</td>"
                + "<td>" + data[i].temp5 + "℃</td>"
                + "<td>" + data[i].temp6 + "℃</td>"
                + "<td>" + data[i].temp7 + "℃</td>"
                + "<td>" + data[i].temp8 + "℃</td>"
                + "<td>" + data[i].temp9 + "℃</td>"
                + "</tr>";
    }
    if (len == 0) {
        tableStr = tableStr + "<tr style='text-align: center'>"
        + "<td colspan='6'><font color='#cd0a0a'>" + 暂无记录 + "</font></td>"
        + "</tr>";
    }
    tableStr = tableStr + "</table>";
    //添加到div中
    $("#tableAjax").html(tableStr);
}
