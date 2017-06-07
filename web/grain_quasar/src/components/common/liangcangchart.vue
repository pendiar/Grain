<template>
  <!-- root node required -->
  <div class="chuanganchart">
    <div ref="chart"></div>
  </div>
</template>

<script>
import Highcharts from 'highcharts';
// 加载模块
require('highcharts/highcharts-3d')(Highcharts);

export default {
  props: ['type'],
  computed: {
    minDate() {
      let nowDate = new Date().getTime();
      switch(Number(this.type)) {
        case 0:
          return nowDate - 24*3600000;
        case 1:
          return nowDate - 7*24*3600000;
        case 2:
          return nowDate - 30*24*3600000;
        case 3:
          return nowDate - 365*24*3600000;
        default:
          return nowDate - 24*3600000;
      }
    },
  },
  data() {
    return {
      // getData: [17,21,22,25,26,24,19,29,26,25,24,20,23,26,25,30,27,22,21,26,24,21,22,18,27,25,23,26,22,21,24,25,22,28,26,22,21,22,24],
      heapTempData: [],
    };
  },
  methods: {
    getTemp(type) {
      // console.log(this.heapTempData.filter(item => item.Type === type),type)
      const result = this.heapTempData.filter(item => item.Type === type && new Date(item.StampTime).getTime() < new Date().getTime() && new Date(item.StampTime).getTime() > this.minDate).sort((a, b) => (new Date(a.StampTime) - new Date(b.StampTime))).map((item) => {
        // console.log(item.StampTime)
        // return [Date.UTC.apply(this,item.StampTime.replace(/:|\/|\s+/g,'-').split('-').map(val => Number(val))), item.Temp];
        // console.log(new Date(item.StampTime).getTime())
        return [new Date(item.StampTime).getTime() + 8*3600000, item.Temp];
      });
      // console.log(result);
      return result;
    },
    fetchData() {
      // if (to.name !== 'LiangCang') return;
      this.$http.get(`${this.serverAddress}/Granary/GetHeapTempChart/${this.$route.params.id}/${this.type}`).then((response) => {
        if (response.data.Code === 1000) {
          try {
            this.heapTempData = JSON.parse(response.data.JsonValue);
          } catch (e) {
            this.heapTempData = [];
          }
        } else {
          this.heapTempData = [];
        }
        this.setChart();
      }, () => {
        this.heapTempData = [];
        this.setChart();
      });
    },
    setChart() {
      var chart = new Highcharts.Chart({
        credits:{enabled:false},
          chart: {
            renderTo: this.$refs.chart,
            type: 'spline',
          },
          title: {
            text: this.code,
            x: -20
          },
          xAxis: {
              type: 'datetime',
              dateTimeLabelFormats: {
                  // millisecond: '%H:%M:%S.%L',
                  millisecond: '%H:%M:%S',
                  second: '%H:%M:%S',
                  minute: '%H:%M',
                  hour: '%H:%M',
                  day: '%m-%d',
                  week: '%m-%d',
                  month: '%Y-%m',
                  year: '%Y'
              },
              min: this.minDate + 8*3600000,
              max: new Date().getTime() + 8*3600000,
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
          plotOptions: {
              series: {
                  marker: {
                      enabled: true
                  }
              }
          },
          tooltip: {
              valueSuffix: '°C',
              dateTimeLabelFormats: {
                  // millisecond: '%H:%M:%S.%L',
                  millisecond: '%H:%M:%S',
                  second: '%H:%M:%S',
                  minute: '%H:%M',
                  hour: '%H:%M',
                  day: '%Y-%m-%d',
                  week: '%m-%d',
                  month: '%Y-%m',
                  year: '%Y'
              }
          },
          // legend: {
          //     // layout: 'vertical',
          //     // align: 'center',
          //     // verticalAlign: 'bottom',
          //     borderWidth: 0
          // },
          series: [{
              name: '仓外温度',
              data: this.getTemp(3),
          }, {
              name: '仓内温度',
              data: this.getTemp(2),
          },{
              name: '粮堆温度',
              data: this.getTemp(1),
          }]
      });
      // console.log(new Date(this.minDate))
    }
  },
  // mounted() {
  //   const getColor = [];
  //   const getData = this.getData;
  //   getData.forEach((temp) => {
  //       if (temp < 20) {
  //           getColor.push({ color: "0000ff" });
  //       } else if (temp >= 20 && temp < 24) {
  //           getColor.push({ color: temp < 22 ? "#003399" : "#0099cc" });
  //       } else if (temp >= 24 && temp < 28) {
  //           getColor.push({ color: temp < 26 ? "#ffcc00" : "#ffcc00" });
  //       } else if (temp >= 28) {
  //           getColor.push({ color: temp < 30 ? "#ff0000" : "#ff0000" });
  //       }
  //   });
  //   var demoData = [];
  //   demoData.push({ x: 3, y: 3, z: 3, temp: getData[0], color: getColor[0].color });
  //   demoData.push({ x: 3, y: 3, z: 6, temp: getData[1], color: getColor[1].color });
  //   demoData.push({ x: 3, y: 3, z: 9, temp: getData[2], color: getColor[2].color });
  //   demoData.push({ x: 6, y: 3, z: 3, temp: getData[3], color: getColor[3].color });
  //   demoData.push({ x: 6, y: 3, z: 6, temp: getData[4], color: getColor[4].color });
  //   demoData.push({ x: 6, y: 3, z: 9, temp: getData[5], color: getColor[5].color });
  //   demoData.push({ x: 9, y: 3, z: 3, temp: getData[6], color: getColor[6].color });
  //   demoData.push({ x: 9, y: 3, z: 6, temp: getData[7], color: getColor[7].color });
  //   demoData.push({ x: 9, y: 3, z: 9, temp: getData[8], color: getColor[8].color });
  //   demoData.push({ x: 3, y: 6, z: 3, temp: getData[9], color: getColor[9].color });
  //   demoData.push({ x: 3, y: 6, z: 6, temp: getData[10], color: getColor[10].color });
  //   demoData.push({ x: 3, y: 6, z: 9, temp: getData[11], color: getColor[11].color });
  //   demoData.push({ x: 6, y: 6, z: 3, temp: getData[12], color: getColor[12].color });
  //   demoData.push({ x: 6, y: 6, z: 6, temp: getData[13], color: getColor[13].color });
  //   demoData.push({ x: 6, y: 6, z: 9, temp: getData[14], color: getColor[14].color });
  //   demoData.push({ x: 9, y: 6, z: 3, temp: getData[15], color: getColor[15].color });
  //   demoData.push({ x: 9, y: 6, z: 6, temp: getData[16], color: getColor[16].color });
  //   demoData.push({ x: 9, y: 6, z: 9, temp: getData[17], color: getColor[17].color });
  //   demoData.push({ x: 3, y: 9, z: 3, temp: getData[18], color: getColor[18].color });
  //   demoData.push({ x: 3, y: 9, z: 6, temp: getData[19], color: getColor[19].color });
  //   demoData.push({ x: 3, y: 9, z: 9, temp: getData[20], color: getColor[20].color });
  //   demoData.push({ x: 6, y: 9, z: 3, temp: getData[21], color: getColor[21].color });
  //   demoData.push({ x: 6, y: 9, z: 6, temp: getData[22], color: getColor[22].color });
  //   demoData.push({ x: 6, y: 9, z: 9, temp: getData[23], color: getColor[23].color });
  //   demoData.push({ x: 9, y: 9, z: 3, temp: getData[24], color: getColor[24].color });
  //   demoData.push({ x: 9, y: 9, z: 6, temp: getData[25], color: getColor[25].color });
  //   demoData.push({ x: 9, y: 9, z: 9, temp: getData[26], color: getColor[26].color });
  //   this.demoData = demoData;
  // },
  mounted() {
    this.fetchData();
  },
  // updated() {
  //   this.$http.get(`${this.serverAddress}/Granary/GetHeapTempChart/${this.$route.params.id}/${this.type}`).then((response) => {
      
  //   });
  // },
  watch: {
    type: 'fetchData',
    '$route': function(to) {
      if (to.name === 'LiangCang') {
        this.fetchData();
      }
    },
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
