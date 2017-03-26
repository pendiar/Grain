<template>
  <!-- root node required -->
  <div class="chuangan3d"></div>
</template>

<script>
import Highcharts from 'highcharts';
// 加载模块
require('highcharts/highcharts-3d')(Highcharts);

export default {
  props: ['code'],
  data() {
    return {
      getData: [17,21,22,25,26,24,19,29,26,25,24,20,23,26,25,30,27,22,21,26,24,21,22,18,27,25,23,26,22,21,24,25,22,28,26,22,21,22,24],
      demoData: [],
    };
  },
  created() {
    const getColor = [];
    const getData = this.getData;
    getData.forEach((temp) => {
        if (temp < 20) {
            getColor.push({ color: "0000ff" });
        } else if (temp >= 20 && temp < 24) {
            getColor.push({ color: temp < 22 ? "#003399" : "#0099cc" });
        } else if (temp >= 24 && temp < 28) {
            getColor.push({ color: temp < 26 ? "#ffcc00" : "#ffcc00" });
        } else if (temp >= 28) {
            getColor.push({ color: temp < 30 ? "#ff0000" : "#ff0000" });
        }
    });
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
    this.demoData = demoData;
  },
  mounted() {
    var chart = new Highcharts.Chart({
      credits:{enabled:false},
        chart: {
            renderTo: this.$el,
            margin: 60,
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
            text: this.code+'粮堆温度展示',
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
            { data: this.demoData }
        ]
    });
    chart.container.addEventListener('mousedown', start);
    chart.container.addEventListener('touchstart', start);
    function start(e) {
        e = chart.pointer.normalize(e);
        var posX = e.pageX,
            posY = e.pageY,
            alpha = chart.options.chart.options3d.alpha,
            beta = chart.options.chart.options3d.beta,
            newAlpha,
            newBeta,
            sensitivity = 5; // lower is more sensitive
        function moving(e) {
            // Run beta
            newBeta = beta + (posX - e.pageX) / sensitivity;
            newBeta = Math.min(100, Math.max(-100, newBeta));
            chart.options.chart.options3d.beta = newBeta;
            // Run alpha
            newAlpha = alpha + (e.pageY - posY) / sensitivity;
            newAlpha = Math.min(100, Math.max(-100, newAlpha));
            chart.options.chart.options3d.alpha = newAlpha;
            chart.redraw(false);
        }
        function end() {
            document.removeEventListener('mousedown', start);
            document.removeEventListener('touchstart', start);
            document.removeEventListener('mousemove', moving);
            document.removeEventListener('touchdrag', moving);
        }
        document.addEventListener('mousemove', moving);
        document.addEventListener('touchdrag', moving);
        document.addEventListener('mouseup', end);
        document.addEventListener('touchend', end);
    }
  },
};
</script>

<style scoped lang="less">
.chuangan3d{
  width: 100%;
  height: 400px;
  min-width: 310px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
