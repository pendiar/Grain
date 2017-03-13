// 页面二散点图数据查询
var chart2;
var options2 = {
    chart: {
        renderTo: 'container2',
        type: 'heatmap',
        marginTop: 40,
        marginBottom: 80
    },
    title: {
        text: null
    },
    xAxis: {
        categories: ['Alexander'],
        labels: {
            enabled: false
        }
    },
    yAxis: {
        categories: ['1', '2', '3', '4', '5'],
        title: null,
        labels: {
            enabled: false
        }
    },
    colorAxis: {
        min: 0,
        minColor: '#CCCCCC',
        maxColor: '#BFEFFF'
        //maxColor: Highcharts.getOptions().colors[0]
    },
    legend: {
        enabled: false,
        align: 'right',
        layout: 'vertical',
        margin: 0,
        verticalAlign: 'top',
        y: 25,
        symbolHeight: 280
    },
    tooltip: {
        enabled: false
        //formatter: function () {
        //    return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
        //        this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
        //}
    },
    //plotOptions: {
    //    series: {
    //        events: {
    //            click: function (event) {
    //                $("#container2").hide();
    //                query2_1(this.series.point.y);
    //                alert(this.name);
    //            }
    //        }
    //    }
    //}
};
function query2_0() {
    var series2 = {
        name: 'Sales per employee',
        borderWidth: 1,
        data: [{ x: 0, y: 1, value: 100, color: '#BFEFFF' }, { x: 0, y: 2, z: 0, color: '#CCCCCC' }, { x: 0, y: 3, z: 0, color: '#CCCCCC' }, { x: 0, y: 4, z: 0, color: '#CCCCCC' }, { x: 0, y: 5, z: 0, color: '#CCCCCC' }],
        dataLabels: {
            enabled: true,
            color: '#000000',
            formatter: function () {
                return '第' + this.point.y + '层';  // 重新设置节点显示数据
            }
        },
        events: {
            click: function (event) {
                query2_1(event.point.y);
                //alert(event.point.y);
            }
        }
    };
    chart2 = new Highcharts.Chart(options2);
    chart2.addSeries(series2);
}
function query2_1(str) {
    var dataDemo = new Array();
    $.ajax({
        type: "post",
        url: "/GrainTemp/tempQueryView10",
        data: { floor: str },
        success: function (response) {
            var str = response;
            var strs = new Array();
            if (str != "") {
                strs = str.split(";");
                dataDemo.push([0, 0, strs[1]]);
                dataDemo.push([1, 0, strs[0]]);
            } else {
                dataDemo.push([0, 0, 00000]);
                dataDemo.push([1, 0, 00000]);
            }

            var series2 = {
                name: 'Sales per employee',
                borderWidth: 1,
                data: dataDemo,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    formatter: function () {
                        var value = this.point.value;
                        if (value != "" && value != null && value != "00000") {
                            var value1 = value.substring(0, 2);
                            var value2 = value.substring(2, 4);
                            var value3 = value.substring(4, 5);
                            return '平均温度:' + value1 + '℃，平均湿度:' + value2 + "%";  // 重新设置节点显示数据
                        } else {
                            return '暂无数据';
                        }
                    }
                }
            };
            options2.plotOptions = {
                series: {
                    events: {
                        click: function (event) {
                            //$("#container2").hide();
                            //alert("123");
                            query2_2(event.point.value.substring(4,5));
                        }
                    }
                }
            }
            chart2 = new Highcharts.Chart(options2);
            chart2.addSeries(series2);
        }
    });
    //var dataDemo = "[[0, 0, 15], [0, 1, 19], [0, 2, 8],[1, 0, 24], [1, 1, 67], [1, 2, 17],[2, 0, 24], [2, 1, 67], [2, 2, 17]]";

    //dataDemo.push([0, 0, 15]);


}
function query2_2(str) {
    var dataDemo = new Array();
    $.ajax({
        type: "post",
        url: "/GrainTemp/tempQueryView11",
        data: { granaryid: str },
        success: function (response) {
            var str = response;
            var strs = new Array();
            strs = str.split(";");
            for (var i = 0; i < strs.length; i++) {
                if (strs[i].split(",")[3] == "1") {
                    dataDemo.push({ x: parseInt(strs[i].split(",")[0]), y: parseInt(strs[i].split(",")[1]), value: strs[i].split(",")[2], color: "#BFEFFF" });
                } else {
                    dataDemo.push({ x: parseInt(strs[i].split(",")[0]), y: parseInt(strs[i].split(",")[1]), value: strs[i].split(",")[2], color: "#CCCCCC" });
                }
            }

            var series2 = {
                name: 'Sales per employee',
                borderWidth: 1,
                data: dataDemo,
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    //formatter: function () {
                    //    var value = this.point.value;
                    //    var value1 = value.substring(0, 2);
                    //    var value2 = value.substring(2, 4);
                    //    return '平均温度是：' + value1 + '℃，平均湿度是：' + value2 + "%";  // 重新设置节点显示数据

                    //}
                }
            };
            options2.plotOptions = {
                series: {
                    events: {
                        click: function (event) {
                            //$("#container2").hide();
                            //document.getElementById("testid").value = "somethind";
                            query2_3(event.point.value);

                        }
                    }
                }
            }
            chart2 = new Highcharts.Chart(options2);
            chart2.addSeries(series2);
        }
    });
    //var dataDemo = "[[0, 0, 15], [0, 1, 19], [0, 2, 8],[1, 0, 24], [1, 1, 67], [1, 2, 17],[2, 0, 24], [2, 1, 67], [2, 2, 17]]";

    //dataDemo.push([0, 0, 15]);


}
function query2_3(str) {
    document.getElementById("testid").value = str;
        //页面二数据查询
        $.ajax({
            type: "post",
            url: "/GrainTemp/tempQueryView2",
            data: { granarycode: str },
            success: function (response) {
                if (response != "") {
                    var code = response.substr(-4);
                    var getData = response.substring(0,response.length-4).split(",");
                    var getColor = [];
                    for (var i = 0; i < getData.length; i++) {
                        var temp = getData[i];
                        if (temp < 20) {
                            getColor.push({ color: "0000ff" });
                        } else if (temp >= 20 && temp < 24) {
                            getColor.push({ color: temp < 22 ? "#003399" : "#0099cc" });
                        } else if (temp >= 24 && temp < 28) {
                            getColor.push({ color: temp < 26 ? "#ffcc00" : "#ffcc00" });
                        } else if (temp >= 28) {
                            getColor.push({ color: temp < 30 ? "#ff0000" : "#ff0000" });
                        }
                    }
                    var demoData = [];
                    demoData.push({ x: 3, y: 3, z: 3, temp: getData[0], color: getColor[0].color });
                    demoData.push({ x: 3, y: 3, z: 6, temp: getData[1], color: getColor[1].color });
                    demoData.push({ x: 3, y: 3, z: 9, temp: getData[2], color: getColor[2].color });
                    demoData.push({ x: 6, y: 3, z: 3, temp: getData[3], color: getColor[3].color });
                    demoData.push({ x: 6, y: 3, z: 6, temp: getData[4], color: getColor[4].color });
                    demoData.push({ x: 6, y: 3, z: 9, temp: getData[5], color: getColor[5].color });
                    demoData.push({ x: 9, y: 3, z: 3, temp: getData[6], color: getColor[6].color });
                    demoData.push({ x: 9, y: 3, z: 6, temp: getData[7], color: getColor[7].color });
                    demoData.push({ x: 9, y: 3, z: 9, temp: getData[8], color: getColor[8].color });
                    demoData.push({ x: 3, y: 6, z: 3, temp: getData[9], color: getColor[9].color });
                    demoData.push({ x: 3, y: 6, z: 6, temp: getData[10], color: getColor[10].color });
                    demoData.push({ x: 3, y: 6, z: 9, temp: getData[11], color: getColor[11].color });
                    demoData.push({ x: 6, y: 6, z: 3, temp: getData[12], color: getColor[12].color });
                    demoData.push({ x: 6, y: 6, z: 6, temp: getData[13], color: getColor[13].color });
                    demoData.push({ x: 6, y: 6, z: 9, temp: getData[14], color: getColor[14].color });
                    demoData.push({ x: 9, y: 6, z: 3, temp: getData[15], color: getColor[15].color });
                    demoData.push({ x: 9, y: 6, z: 6, temp: getData[16], color: getColor[16].color });
                    demoData.push({ x: 9, y: 6, z: 9, temp: getData[17], color: getColor[17].color });
                    demoData.push({ x: 3, y: 9, z: 3, temp: getData[18], color: getColor[18].color });
                    demoData.push({ x: 3, y: 9, z: 6, temp: getData[19], color: getColor[19].color });
                    demoData.push({ x: 3, y: 9, z: 9, temp: getData[20], color: getColor[20].color });
                    demoData.push({ x: 6, y: 9, z: 3, temp: getData[21], color: getColor[21].color });
                    demoData.push({ x: 6, y: 9, z: 6, temp: getData[22], color: getColor[22].color });
                    demoData.push({ x: 6, y: 9, z: 9, temp: getData[23], color: getColor[23].color });
                    demoData.push({ x: 9, y: 9, z: 3, temp: getData[24], color: getColor[24].color });
                    demoData.push({ x: 9, y: 9, z: 6, temp: getData[25], color: getColor[25].color });
                    demoData.push({ x: 9, y: 9, z: 9, temp: getData[26], color: getColor[26].color });

                    var chart = new Highcharts.Chart({
                        chart: {
                            renderTo: 'container2',
                            margin: 100,
                            type: 'scatter',
                            backgroundColor: '#efeff4',
                            options3d: {
                                enabled: true,
                                alpha: 10,
                                beta: 30,
                                depth: 250,
                                viewDistance: 5,
                                frame: {
                                    bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },//底面颜色
                                    back: { size: 1, color: 'rgba(0,0,0,0.04)' },//背面颜色
                                    side: { size: 1, color: 'rgba(0,0,0,0.06)' }//侧面颜色
                                }
                            }
                        },
                        colors: [
                                    'red',//第一个颜色
                                    'blue'//第二个颜色
                                    //'#EDCA4E'//第三个颜色
                        ],
                        title: {
                            text: code+'粮堆温度展示',
                        },
                        subtitle: {
                            text: null
                        },
                        plotOptions: {
                            scatter: {
                                width: 10,
                                height: 10,
                                depth: 10
                            },
                            series: {
                                marker: {
                                    radius: 5
                                }
                            }
                        },
                        yAxis: {
                            title: {
                                text: "粮堆高"
                            },
                            min: 0,
                            max: 11,
                        },
                        xAxis: {
                            title: {
                                text: "粮堆长"
                            },
                            min: 0,
                            max: 11,
                            gridLineWidth: 1
                        },
                        zAxis: {
                            title: {
                                text: "粮堆宽"
                            },
                            min: 0,
                            max: 11,
                            showFirstLabel: false
                        },
                        //图例
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            formatter: function () {
                                //return this.series.name + '<br>x: <b>' + this.point.x + '</b><br/>y: <b>' + this.point.y + '</b><br/>z: <b>' + this.point.z + '</b><br/> sex: ' + this.point.temp;
                                return '<br>温度是: <b>' + this.point.temp + '℃';
                            }
                        },
                        series: [
                            { data: demoData }
                        ]
                    });
                    // Add mouse events for rotation
                    $(chart.container).bind('mousedown.hc touchstart.hc', function (e) {
                        e = chart.pointer.normalize(e);
                        var posX = e.pageX,
                            posY = e.pageY,
                            alpha = chart.options.chart.options3d.alpha,
                            beta = chart.options.chart.options3d.beta,
                            newAlpha,
                            newBeta,
                            sensitivity = 5; // lower is more sensitive
                        $(document).bind({
                            'mousemove.hc touchdrag.hc': function (e) {
                                // Run beta
                                newBeta = beta + (posX - e.pageX) / sensitivity;
                                newBeta = Math.min(100, Math.max(-100, newBeta));
                                chart.options.chart.options3d.beta = newBeta;
                                // Run alpha
                                newAlpha = alpha + (e.pageY - posY) / sensitivity;
                                newAlpha = Math.min(100, Math.max(-100, newAlpha));
                                chart.options.chart.options3d.alpha = newAlpha;
                                chart.redraw(false);
                            },
                            'mouseup touchend': function () {
                                $(document).unbind('.hc');
                            }
                        });
                    });
                    $("#detail").show();
                } else {
                    alert("暂无数据");
                }

            }
        });

}
//$(function () {
//    //页面二数据查询
//    $.ajax({
//        type: "post",
//        url: "/GrainTemp/tempQueryView2",
//        data: { tongcang: "tongcang", pingfangcagn: "pingfagncang" },
//        success: function (response) {
//            var getData = response.split(",");
//            var getColor = [];
//            for (var i = 0; i < getData.length; i++) {
//                var temp = getData[i];
//                if (temp < 20) {
//                    getColor.push({ color: "0000ff" });
//                } else if (temp >= 20 && temp < 24){
//                    getColor.push({ color: temp < 22 ? "#003399" : "#0099cc" });
//                } else if (temp >= 24 && temp < 28) {
//                    getColor.push({ color: temp < 26 ? "#ffcc00" : "#ffcc00" });
//                } else if (temp >= 28){
//                    getColor.push({ color: temp < 30 ? "#ff0000" : "#ff0000" });
//                }
//            }
//            var demoData = [];
//            demoData.push({ x: 3, y: 3, z: 3, temp: getData[0], color: getColor[0].color });
//            demoData.push({ x: 3, y: 3, z: 6, temp: getData[1], color: getColor[1].color });
//            demoData.push({ x: 3, y: 3, z: 9, temp: getData[2], color: getColor[2].color });
//            demoData.push({ x: 6, y: 3, z: 3, temp: getData[3], color: getColor[3].color });
//            demoData.push({ x: 6, y: 3, z: 6, temp: getData[4], color: getColor[4].color });
//            demoData.push({ x: 6, y: 3, z: 9, temp: getData[5], color: getColor[5].color });
//            demoData.push({ x: 9, y: 3, z: 3, temp: getData[6], color: getColor[6].color });
//            demoData.push({ x: 9, y: 3, z: 6, temp: getData[7], color: getColor[7].color });
//            demoData.push({ x: 9, y: 3, z: 9, temp: getData[8], color: getColor[8].color });
//            demoData.push({ x: 3, y: 6, z: 3, temp: getData[9], color: getColor[9].color });
//            demoData.push({ x: 3, y: 6, z: 6, temp: getData[10], color: getColor[10].color });
//            demoData.push({ x: 3, y: 6, z: 9, temp: getData[11], color: getColor[11].color });
//            demoData.push({ x: 6, y: 6, z: 3, temp: getData[12], color: getColor[12].color });
//            demoData.push({ x: 6, y: 6, z: 6, temp: getData[13], color: getColor[13].color });
//            demoData.push({ x: 6, y: 6, z: 9, temp: getData[14], color: getColor[14].color });
//            demoData.push({ x: 9, y: 6, z: 3, temp: getData[15], color: getColor[15].color });
//            demoData.push({ x: 9, y: 6, z: 6, temp: getData[16], color: getColor[16].color });
//            demoData.push({ x: 9, y: 6, z: 9, temp: getData[17], color: getColor[17].color });
//            demoData.push({ x: 3, y: 9, z: 3, temp: getData[18], color: getColor[18].color });
//            demoData.push({ x: 3, y: 9, z: 6, temp: getData[19], color: getColor[19].color });
//            demoData.push({ x: 3, y: 9, z: 9, temp: getData[20], color: getColor[20].color });
//            demoData.push({ x: 6, y: 9, z: 3, temp: getData[21], color: getColor[21].color });
//            demoData.push({ x: 6, y: 9, z: 6, temp: getData[22], color: getColor[22].color });
//            demoData.push({ x: 6, y: 9, z: 9, temp: getData[23], color: getColor[23].color });
//            demoData.push({ x: 9, y: 9, z: 3, temp: getData[24], color: getColor[24].color });
//            demoData.push({ x: 9, y: 9, z: 6, temp: getData[25], color: getColor[25].color });
//            demoData.push({ x: 9, y: 9, z: 9, temp: getData[26], color: getColor[26].color });

//            var chart = new Highcharts.Chart({
//                chart: {
//                    renderTo: 'container',
//                    margin: 100,
//                    type: 'scatter',
//                    backgroundColor: '#efeff4',
//                    options3d: {
//                        enabled: true,
//                        alpha: 10,
//                        beta: 30,
//                        depth: 250,
//                        viewDistance: 5,
//                        frame: {
//                            bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },//底面颜色
//                            back: { size: 1, color: 'rgba(0,0,0,0.04)' },//背面颜色
//                            side: { size: 1, color: 'rgba(0,0,0,0.06)' }//侧面颜色
//                        }
//                    }
//                },
//                colors: [
//                            'red',//第一个颜色
//                            'blue'//第二个颜色
//                            //'#EDCA4E'//第三个颜色
//                ],
//                title: {
//                    text: '平方仓温度展示',
//                },
//                subtitle: {
//                    text: null
//                },
//                plotOptions: {
//                    scatter: {
//                        width: 10,
//                        height: 10,
//                        depth: 10
//                    },
//                    series: {
//                        marker: {
//                            radius: 14
//                        }
//                    }
//                },
//                yAxis: {
//                    title: {
//                        text: "y轴"
//                    },
//                    min: 0,
//                    max: 11,
//                },
//                xAxis: {
//                    title: {
//                        text: "x轴"
//                    },
//                    min: 0,
//                    max: 11,
//                    gridLineWidth: 1
//                },
//                zAxis: {
//                    title: {
//                        text: "z轴"
//                    },
//                    min: 0,
//                    max: 11,
//                    showFirstLabel: false
//                },
//                //图例
//                legend: {
//                    enabled: false
//                },
//                tooltip: {
//                    formatter: function () {
//                        //return this.series.name + '<br>x: <b>' + this.point.x + '</b><br/>y: <b>' + this.point.y + '</b><br/>z: <b>' + this.point.z + '</b><br/> sex: ' + this.point.temp;
//                        return '<br>温度是: <b>' + this.point.temp + '℃';
//                    }
//                },
//                series: [
//                    { data: demoData }
//                ]
//            });
//            // Add mouse events for rotation
//            $(chart.container).bind('mousedown.hc touchstart.hc', function (e) {
//                e = chart.pointer.normalize(e);
//                var posX = e.pageX,
//                    posY = e.pageY,
//                    alpha = chart.options.chart.options3d.alpha,
//                    beta = chart.options.chart.options3d.beta,
//                    newAlpha,
//                    newBeta,
//                    sensitivity = 5; // lower is more sensitive
//                $(document).bind({
//                    'mousemove.hc touchdrag.hc': function (e) {
//                        // Run beta
//                        newBeta = beta + (posX - e.pageX) / sensitivity;
//                        newBeta = Math.min(100, Math.max(-100, newBeta));
//                        chart.options.chart.options3d.beta = newBeta;
//                        // Run alpha
//                        newAlpha = alpha + (e.pageY - posY) / sensitivity;
//                        newAlpha = Math.min(100, Math.max(-100, newAlpha));
//                        chart.options.chart.options3d.alpha = newAlpha;
//                        chart.redraw(false);
//                    },
//                    'mouseup touchend': function () {
//                        $(document).unbind('.hc');
//                    }
//                });
//            });
//        }
//    });
//});
