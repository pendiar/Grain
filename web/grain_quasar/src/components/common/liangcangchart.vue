<template>
  <!-- root node required -->
  <div class="chuanganchart"></div>
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
  mounted() {
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
        },
        title: {
            text: this.code,
            x: -20
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        yAxis: {
            title: {
                text: '温度'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C',
            dateTimeLabelFormats: {
                millisecond: '%H:%M:%S.%L',
                second: '%H:%M:%S',
                minute: '%H:%M',
                hour: '%H:%M',
                day: '%Y-%m-%d',
                week: '%m-%d',
                month: '%Y-%m',
                year: '%Y'
            }
        },
        legend: {
            // layout: 'vertical',
            // align: 'center',
            // verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: '仓外温度',
            data: [
                [Date.UTC(2015,5,1,9,0),0.9151],
                [Date.UTC(2015,5,1,9,5),0.8965],
                [Date.UTC(2015,5,1,9,10),0.8871],
                [Date.UTC(2015,5,1,9,15),0.8898],
                [Date.UTC(2015,5,1,9,20),0.8999],
                [Date.UTC(2015,5,1,9,25),0.9004],
                [Date.UTC(2015,5,1,9,30),0.8857],
                [Date.UTC(2015,5,1,9,35),0.8862],
                [Date.UTC(2015,5,1,9,40),0.8829],
                [Date.UTC(2015,5,1,9,45),0.8882],
                [Date.UTC(2015,5,1,9,50),0.8873],
                [Date.UTC(2015,5,1,9,55),0.8913],
                [Date.UTC(2015,5,1,10,0),0.8862],
                [Date.UTC(2015,5,1,10,5),0.8891],
                [Date.UTC(2015,5,1,10,10),0.8821],
                [Date.UTC(2015,5,1,10,15),0.8802],
                [Date.UTC(2015,5,1,10,20),0.8808],
                [Date.UTC(2015,5,1,10,25),0.8794],
                [Date.UTC(2015,5,1,10,30),0.8818],
                [Date.UTC(2015,5,1,10,35),0.8952],
                [Date.UTC(2015,5,1,10,40),0.8924],
                [Date.UTC(2015,5,1,10,45),0.8925],
                [Date.UTC(2015,5,1,10,50),0.8955],
                [Date.UTC(2015,5,1,10,55),0.9113],
                [Date.UTC(2015,5,1,11,0),0.8900],
                [Date.UTC(2015,5,1,11,5),0.8950]
            ].map(function(item){
                return [item[0],parseInt(item[1]*280)/10];
            })
        }, {
            name: '仓内温度',
            data: [
                [Date.UTC(2015,5,1,9,0),0.7571],
                [Date.UTC(2015,5,1,9,5),0.7529],
                [Date.UTC(2015,5,1,9,10),0.7532],
                [Date.UTC(2015,5,1,9,15),0.7542],
                [Date.UTC(2015,5,1,9,20),0.7515],
                [Date.UTC(2015,5,1,9,25),0.7498],
                [Date.UTC(2015,5,1,9,30),0.7473],
                [Date.UTC(2015,5,1,9,35),0.7494],
                [Date.UTC(2015,5,1,9,40),0.7497],
                [Date.UTC(2015,5,1,9,45),0.7519],
                [Date.UTC(2015,5,1,9,50),0.7540],
                [Date.UTC(2015,5,1,9,55),0.7543],
                [Date.UTC(2015,5,1,10,0),0.7492],
                [Date.UTC(2015,5,1,10,5),0.7502],
                [Date.UTC(2015,5,1,10,10),0.7503],
                [Date.UTC(2015,5,1,10,15),0.7499],
                [Date.UTC(2015,5,1,10,20),0.7453],
                [Date.UTC(2015,5,1,10,25),0.7487],
                [Date.UTC(2015,5,1,10,30),0.7487],
                [Date.UTC(2015,5,1,10,35),0.7472],
                [Date.UTC(2015,5,1,10,40),0.7471],
                [Date.UTC(2015,5,1,10,45),0.7480],
                [Date.UTC(2015,5,1,10,50),0.7467],
                [Date.UTC(2015,5,1,10,55),0.7497],
                [Date.UTC(2015,5,1,11,0),0.7552],
                [Date.UTC(2015,5,1,11,5),0.7562]
            ].map(function(item){
                return [item[0],parseInt(item[1]*300)/10];
            })
        },{
            name: '粮堆温度',
            data: [
                [Date.UTC(2015,5,1,9,0),0.9151],
                [Date.UTC(2015,5,1,9,5),0.8965],
                [Date.UTC(2015,5,1,9,10),0.8871],
                [Date.UTC(2015,5,1,9,15),0.8898],
                [Date.UTC(2015,5,1,9,20),0.8999],
                [Date.UTC(2015,5,1,9,25),0.9004],
                [Date.UTC(2015,5,1,9,30),0.8857],
                [Date.UTC(2015,5,1,9,35),0.8862],
                [Date.UTC(2015,5,1,9,40),0.8829],
                [Date.UTC(2015,5,1,9,45),0.8882],
                [Date.UTC(2015,5,1,9,50),0.8873],
                [Date.UTC(2015,5,1,9,55),0.8913],
                [Date.UTC(2015,5,1,10,0),0.8862],
                [Date.UTC(2015,5,1,10,5),0.8891],
                [Date.UTC(2015,5,1,10,10),0.8821],
                [Date.UTC(2015,5,1,10,15),0.8802],
                [Date.UTC(2015,5,1,10,20),0.8808],
                [Date.UTC(2015,5,1,10,25),0.8794],
                [Date.UTC(2015,5,1,10,30),0.8818],
                [Date.UTC(2015,5,1,10,35),0.8952],
                [Date.UTC(2015,5,1,10,40),0.8924],
                [Date.UTC(2015,5,1,10,45),0.8925],
                [Date.UTC(2015,5,1,10,50),0.8955],
                [Date.UTC(2015,5,1,10,55),0.9113],
                [Date.UTC(2015,5,1,11,0),0.8900],
                [Date.UTC(2015,5,1,11,5),0.8950]
            ].map(function(item){
                return [item[0],parseInt(((item[1]-0.88)*2+0.88)*300)/10];
            })
        }]
    });
  },
};
</script>

<style scoped lang="less">
.chuanganchart{
  width: 100%;
  height: 400px;
  min-width: 310px;
  // max-width: 800px;
  margin: 0 auto;
}
</style>
