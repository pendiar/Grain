<template>
  <!-- root node required -->
  <div class="chuangan-line"></div>
</template>

<script>
import Highcharts from 'highcharts';
// 加载模块
require('highcharts/highcharts-3d')(Highcharts);

let chart = null;

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
      //   getData: [17,21,22,25,26,24,19,29,26,25,24,20,23,26,25,30,27,22,21,26,24,21,22,18,27,25,23,26,22,21,24,25,22,28,26,22,21,22,24],
      //   demoData: [],
    };
  },
  methods:{
    setChart() {
      const vm = this;
	    vm.clearChart();
      const option = {  
        chart: {
          renderTo: this.$el,
          type: 'spline',
          inverted: true
        },
        title: {
          text: `${vm.$route.query.Number} 粮堆温度展示`   
        },
        subtitle: {
          // text: 'According to the Standard Atmosphere Model'
        },
        credits: {
          enabled:false // 禁用版权信息
        },
        legend: {
          // itemStyle: { cursor: 'pointer', color: '#3E576F' },
          enabled: false 
        },
        xAxis: {
          reversed: false,
          title: {
            enabled: true,
            text: 'Length'
          },
          labels: {
            formatter: function () {
              return this.value + 'm';
            }
          },
          maxPadding: 0.01,
          showLastLabel: true
        },
        yAxis: {
          title: {
            text: 'Labels'
          },
          labels: {
            formatter: function () {
              return this.value;
            }
          },
          lineWidth: 1
        },
        tooltip: {
          headerFormat: '<b>传感线:{series.name}</b><br/>',
          pointFormat: '深度:{point.x} m<br/>温度: {point.y}\xB0C'
        },
        plotOptions: {
          spline: {
            marker: {
              enable: false
            }
          }
        },
        series: [
          {
            name: 'Lable2',
            //allowPointSelect: true,
            marker: {
              symbol: 'square'//点形状
            },
            color:"#90ed7d",
            data: [[2, 2], [4, 2], [6, 2], [8, 2], [10, 2], [12,2], [14, 2], [16, 2], [18, 2]]
          },
          {
            name: 'Lable4',
            marker: {
              symbol: 'square'//点形状
            },
            color:"#90ed7d",
            data: [[2, 4], [4, 4], [6, 4], [8, 4], [10, 4], [12,4], [14, 4], [16, 4], [18, 4]]
          },
          {
            name: 'Lable6',
            marker: {
              symbol: 'square'//点形状
            },
            color:"#90ed7d",
            data: [[2, 6], [4,6], [6, 6], [8,6], [10, 6], [12,6], [14, 6], [16, 6], [18, 6]]
          },
          {
            name: 'Lable8',
            marker: {
              symbol: 'square'//点形状
            },
            color:"#90ed7d",
            data: [[2, 8], [4,8], [6, 8], [8,8], [10, 8], [12,8], [14, 8], [16, 8], [18,8]]
          },
          {
            name: 'Lable10',
            marker: {
              symbol: 'square'//点形状
            },
            color:"#90ed7d",
            data: [[2, 10], [4, 10], [6, 10], [8, 10], [10,10], [12,10], [14, 10], [16, 10], [18, 10]]
          },
          {
            name: 'Lable12',
            marker: {
              symbol: 'square'//点形状
            },
            color:"#90ed7d",
            data: [[2, 12], [4,12], [6,12], [8,12], [10,12], [12,12], [14, 12], [16, 12], [18, 12]]
          },
          {
            name: 'Lable14',
            marker: {
              symbol: 'square'//点形状
            },
            color:"#90ed7d",
            data: [[2,14], [4,14], [6,14], [8,14], [10,14], [12,14], [14, 14], [16, 14], [18,14]]
          }
        ],
      }
      chart = new Highcharts.Chart(option);
      // chart = new Highcharts.Chart({
      //   credits:{enabled:false},
      //   chart: {
      //     renderTo: this.$el,
      //     margin: 60,
      //     //  margin: 100,
      //     //  margin: 100,
      //     type: 'scatter',
      //     backgroundColor: '#efeff4',
      //     options3d: {
      //       enabled: true,
      //       alpha: 10,
      //       beta: 30,
      //       depth: 250,
      //       viewDistance: 5,
      //       frame: {
      //         bottom: { size: 1, color: 'rgba(0,0,0,0.02)' },//底面颜色
      //         back: { size: 1, color: 'rgba(0,0,0,0.04)' },//背面颜色
      //         side: { size: 1, color: 'rgba(0,0,0,0.06)' }//侧面颜色
      //       }
      //     }
      //   },
      //   colors: [
      //         'red',//第一个颜色
      //         'blue',//第二个颜色
      //         '#EDCA4E'//第三个颜色
      //   ],
      //   title: {
      //     text: `${vm.$route.query.Number} 粮堆温度展示`,
      //   },
      //   subtitle: {
      //     text: null
      //   },
      //   plotOptions: {
      //     scatter: {
      //       width: 100,
      //       height: 100,
      //       depth: 100
      //     },
      //     series: {
      //       marker: {
      //         radius: 8
      //       },
      //       point: {
      //         events: {
      //           click() {
      //             vm.$router.push({ name: 'ChuanGan', params:{ id: this.SensorId }
      //             , query:{x: this.x, y: this.y, z: this.z,SensorId: this.SensorId, Collector:this.Collector,Label:this.Label} });
      //           }
      //         }
      //       }
      //     }
      //   },
      //   yAxis: {
      //     //  labels: {
      //     //   enabled: false,
      //     // },
      //     title: {
      //       text: 'Y',
      //     },
      //     min: 0,
      //     tickInterval: 1,
      //     // max: 5,
      //   },
      //   xAxis: {
      //     ceiling: 60,
      //     //  labels: {
      //     //   enabled: false,
      //     // },
      //     title: {
      //       text: 'X',
      //     },
      //     min: 0,
      //     tickInterval: 1,
      //     // max: 5,
      //     gridLineWidth: 1,
      //   },
      //   zAxis: {
      //     ceiling: 60,
      //     labels: {
      //       enabled: false,
      //     },
      //     tickInterval: 1,
      //     min: 1,
      //     // lineColor:'#FFFFFF',
      //     title: {
      //       text: null,
      //       // align:screenLeft,
      //       useHTML: true,
      //     },
      //     // max: 5,
      //     // showFirstLabel: false,
      //   },
      //   // 图例
      //   legend: {
      //     enabled: false,
      //   },
      //   tooltip: {
      //     formatter: function () {
      //        return ` x坐标: <b>${this.point.x} —[${this.point.SensorId}]</b><br/>
      //        y坐标: <b>${this.point.y} —[${this.point.Label}]</b><br/>
      //        z坐标: <b>${this.point.z} —[${this.point.Collector}]</b><br/>
      //        温度:<b> ${this.point.temp}</b>`;      
      //       //return `采集器: <b>${this.point.Collector}</b><br>传感线: <b>${this.point.Label}</b><br>传感器: <b>${this.point.SensorId}</b><br>x坐标: <b>${this.point.x}</b><br/>y坐标: <b>${this.point.y}</b><br/>z坐标: <b>${this.point.z}</b><br/>温度:<b> ${this.point.temp}</b>`;
      //       // return '<br>温度是: <b>' + this.point.temp + '℃';
      //     }
      //   },
      //   series: [
      //     { data: vm.getData }
      //   ]
      // });
      chart.container.addEventListener('mousedown', this.startDrag);
      chart.container.addEventListener('touchstart', this.startDrag);
    },
    startDrag(e) {
      if (!chart) return;
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
      if (!chart) return;
      chart.container.removeEventListener('mousedown', this.startDrag);
      chart.container.removeEventListener('touchstart', this.startDrag);
      chart.destroy();
    },
  },
  mounted() {
	//   console.log(1111)
	  // this.clearChart();
	  this.setChart();
  },
  watch: {
	  update: 'setChart',
  },
};
</script>

<style scoped lang="less">
.chuangan-line{
  width: 100%;
  height: 400px;
  min-width: 310px;
  max-width: 800px;
  margin: 0 auto;
}
</style>
