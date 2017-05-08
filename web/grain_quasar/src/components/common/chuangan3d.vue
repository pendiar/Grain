<template>
  <!-- root node required -->
  <div class="chuangan3d"></div>
</template>

<script>
import Highcharts from 'highcharts';
// 加载模块
require('highcharts/highcharts-3d')(Highcharts);
import { Platform } from 'quasar';

export default {
  props: ['sensorList', 'update'],
  computed: {
    getData() {
      return this.sensorList.map((sensor) => {
        const temp = sensor.RealTemp;
        let color = '';
        if (temp < 30) {
          color = "#0ce36b";
        } else if (temp >= 30 && temp < 35) {
          color = "#e3780c";
        } else if (temp >= 35) {
          color = "#af4848";      
        } else {
          color = "#0ce36b"
        }
        return { x: sensor.Direction_X, y: sensor.Direction_Y, z: sensor.Direction_Z, temp, color, 
        SensorId: sensor.SensorId, Collector:sensor.Collector,Label:sensor.Label };    
      });
    },
  },
  data() {
    return {
      hovering: {
        x: null,
        y: null,
        z: null,
      },
      chart: null,
      //   getData: [17,21,22,25,26,24,19,29,26,25,24,20,23,26,25,30,27,22,21,26,24,21,22,18,27,25,23,26,22,21,24,25,22,28,26,22,21,22,24],
      //   demoData: [],
    };
  },
  methods:{
    setChart() {
      const vm = this;
	    vm.clearChart();
      vm.chart = new Highcharts.Chart({
        credits:{enabled:false},
        chart: {
          renderTo: vm.$el,
          margin: 60,
          //  margin: 100,
          //  margin: 100,
          //  margin: 100,
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
              'blue',//第二个颜色
              '#EDCA4E'//第三个颜色
        ],
        title: {
          text: `${vm.$route.query.Number} 粮堆温度展示`,
        },
        subtitle: {
          text: null
        },
        plotOptions: {
          scatter: {
            width: 100,
            height: 100,
            depth: 100
          },
          series: {
            marker: {
              radius: 8
            },
            point: {
              events: {
                click() {
                  if (Platform.is.desktop || vm.hovering.x === this.x && vm.hovering.y === this.y && vm.hovering.z === this.z) {
                    vm.$router.push({
                      name: 'ChuanGan',
                      params:{ id: this.SensorId },
                      query:{x: this.x, y: this.y, z: this.z,SensorId: this.SensorId, Collector:this.Collector,Label:this.Label},
                    });
                  } else {
                    vm.hovering.x = this.x;
                    vm.hovering.y = this.y;
                    vm.hovering.z = this.z;
                  }
                }
              }
            }
          }
        },
        yAxis: {
          //  labels: {
          //   enabled: false,
          // },
          title: {
            text: 'Y',
          },
          min: 0,
          tickInterval: 1,
          // max: 5,
        },
        xAxis: {
          ceiling: 60,
          //  labels: {
          //   enabled: false,
          // },
          title: {
            text: 'X',
          },
          min: 0,
          tickInterval: 1,
          // max: 5,
          gridLineWidth: 1,
        },
        zAxis: {
          ceiling: 100,
          labels: {
            enabled: false,
          },
          // tickInterval: 1,
          min: 1,
          // lineColor:'#FFFFFF',
          title: {
              text: null,
              // align:screenLeft,
               useHTML:true,
          }
          // max: 5,
          // showFirstLabel: false,
        },
        // 图例
        legend: {
          enabled: false,
        },
        tooltip: {
          formatter: function () {
             return ` 传感器序号: <b>${this.point.x} </b><br/>
             线号: <b>${this.point.y} </b><br/>
             层号: <b>${this.point.z} </b><br/>
             温度:<b> ${this.point.temp}</b>`;      
            //  return ` x坐标: <b>${this.point.x} —[${this.point.SensorId}]</b><br/>
            //  y坐标: <b>${this.point.y} —[${this.point.Label}]</b><br/>
            //  z坐标: <b>${this.point.z} —[${this.point.Collector}]</b><br/>
            //  温度:<b> ${this.point.temp}</b>`;      
            //return `采集器: <b>${this.point.Collector}</b><br>传感线: <b>${this.point.Label}</b><br>传感器: <b>${this.point.SensorId}</b><br>x坐标: <b>${this.point.x}</b><br/>y坐标: <b>${this.point.y}</b><br/>z坐标: <b>${this.point.z}</b><br/>温度:<b> ${this.point.temp}</b>`;
            // return '<br>温度是: <b>' + this.point.temp + '℃';
          }
        },
        series: [
          { data: vm.getData }
        ]
      });
      vm.chart.container.addEventListener('mousedown', vm.startDrag);
      vm.chart.container.addEventListener('touchstart', vm.startDrag);
    },
    startDrag(e) {
      const vm = this;
      if (!vm.chart) return;
      e = vm.chart.pointer.normalize(e);
      var posX = e.pageX,
        posY = e.pageY,
        alpha = vm.chart.options.chart.options3d.alpha,
        beta = vm.chart.options.chart.options3d.beta,
        newAlpha,
        newBeta,
        sensitivity = 5; // lower is more sensitive
      function moving(e) {
        // Run beta
        newBeta = beta + (posX - e.pageX) / sensitivity;
        newBeta = Math.min(100, Math.max(-100, newBeta));
        vm.chart.options.chart.options3d.beta = newBeta;
        // Run alpha
        newAlpha = alpha + (e.pageY - posY) / sensitivity;
        newAlpha = Math.min(100, Math.max(-100, newAlpha));
        vm.chart.options.chart.options3d.alpha = newAlpha;
        vm.chart.redraw(false);
      }
      function end() {
        // document.removeEventListener('mousedown', start);
        // document.removeEventListener('touchstart', start);
        document.removeEventListener('mousemove', moving);
        document.removeEventListener('touchdrag', moving);
        document.removeEventListener('mouseup', end);
        document.removeEventListener('touchend', end);
      }
      document.addEventListener('mousemove', moving);
      document.addEventListener('touchdrag', moving);
      document.addEventListener('mouseup', end);
      document.addEventListener('touchend', end);
    },
    clearChart() {
      if (!this.chart) return;
      this.chart.container.removeEventListener('mousedown', this.startDrag);
      this.chart.container.removeEventListener('touchstart', this.startDrag);
      this.chart.destroy();
    },
  },
  mounted() {
	//   console.log(1111)
	  // this.clearChart();
    this.$nextTick(function () {
      this.setChart();
    });
  },
  watch: {
	  update: 'setChart',
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
