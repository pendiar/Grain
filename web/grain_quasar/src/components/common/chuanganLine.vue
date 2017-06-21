<template>
  <!-- root node required -->
  <div class="chuangan-line">
    <div ref="chart"></div>
    <q-modal ref="modal" :content-css="{minWidth: '60vw', minHeight: '60vh'}" @open="modalEvent('open')" @close="modalEvent('close')">
      <q-layout>
        <div slot="header" class="toolbar">
          <button @click="$refs.modal.close()">
              <i>keyboard_arrow_left</i>
          </button>
          <q-toolbar-title :padding="1">
              {{cangName||cnumber}}粮仓 单位深度{{x}}截面展示
          </q-toolbar-title>
        </div>
        <div class="layout-view">
          <div ref="polarChart" class="polarChart"></div>
        </div>
      </q-layout>
    </q-modal>
  </div>
</template>

<script>
// import Highcharts from 'highcharts';
// // 加载模块
// require('highcharts/highcharts-more')(Highcharts);
import { Platform } from 'quasar';

export default {
  props: ['sensorList', 'update', 'LineCount','cnumber', 'cangName', 'lasttime'],
  computed: {
    getData() {
      const result = [];
      const map = {};
      this.sensorList.forEach((sensor) => {
        const temp = sensor.RealTemp;
        let color = '';
        const IsBad = !sensor.LastDateTime || ((new Date(sensor.LastDateTime.replace('T', ' ').slice(0, -3)).getTime() + 24*3600000) < new Date(this.lasttime.slice(0, -3)).getTime()) || sensor.IsBad;
        if (IsBad) {
          color = "#c3bcbc";
        } else if (temp < 30) {
          color = "#0ce36b";
        } else if (temp >= 30 && temp < 35) {
          // color = "#e3780c";
          color = "#d6905d";
        } else if (temp >= 35) {
          // color = "#af4848";
          color = "#f70808";
        // } else {
        //   color = "#0ce36b"
        }
        if (sensor.Direction_X in map) {
          result[map[sensor.Direction_X]].data.push({
            x: sensor.Direction_Y,
            y: sensor.Direction_X,
            temp,
            color,
            SensorId: sensor.SensorId,
            Collector: sensor.Collector,
            Label: sensor.Label,
          });
        } else {
          map[sensor.Direction_X] = result.length;
          result.push({
            name: sensor.Direction_X,
            marker: {
              symbol: 'square' // 点形状
            },
            color: "#90ed7d",
            data: [{
              x: sensor.Direction_Y,
              y: sensor.Direction_X,
              temp,
              color,
              SensorId: sensor.SensorId,
              Collector: sensor.Collector,
              Label: sensor.Label,
            }],
          });
        }
      });
      return result;
      // return this.sensorList.filter(sensor => sensor.Direction_Y === this.x).map((sensor) => {
      //   const temp = sensor.RealTemp;
      //   let color = '';
      //   if (temp < 30) {
      //     color = "#0ce36b";
      //   } else if (temp >= 30 && temp < 35) {
      //     color = "#e3780c";
      //   } else if (temp >= 35) {
      //     color = "#af4848";      
      //   } else {
      //     color = "#0ce36b"
      //   }
      //   let count = 0;
      //   let x, y;
      //   this.LineCount.some((num, index) => {
      //     const idx = sensor.Direction_X - count;
      //     if (idx <= num) {
      //       x = parseInt(360 * idx / num);
      //       y = index + 1;
      //       return true;
      //     }
      //     count += num;
      //     return false;
      //   });
      //   return {
      //     x,
      //     y,
      //     temp,
      //     color,
      //     SensorId: sensor.SensorId,
      //     Collector: sensor.Collector,
      //     Label: sensor.Label,
      //   };
      // });
    },
    getPolarData() {
      return this.sensorList.filter(sensor => sensor.Direction_Y === this.x).map((sensor) => {
        const temp = sensor.RealTemp;
        let color = '';
        const IsBad = !sensor.LastDateTime || ((new Date(sensor.LastDateTime.replace('T', ' ').slice(0, -3)).getTime() + 24*3600000) < new Date(this.lasttime.slice(0, -3)).getTime()) || sensor.IsBad;
        if (IsBad) {
          color = "#c3bcbc";
        }else if (temp < 30) {
          color = "#0ce36b";
        } else if (temp >= 30 && temp < 35) {
          // color = "#e3780c";
          color = "#d6905d";
        } else if (temp >= 35) {
          // color = "#af4848";
          color = "#f70808";
        // } else {
        //   color = "#0ce36b"
        }
        let count = 0;
        let x, y;
        this.LineCount.some((num, index) => {
          const idx = sensor.Direction_X - count;
          if (idx <= num) {
            x = parseInt(360 * idx / num);
            y = index + 1;
            return true;
          }
          count += num;
          return false;
        });
        // return [x,y];
        return {
          x,
          y,
          temp,
          color,
          number: sensor.Direction_X,
          SensorId: sensor.SensorId,
          Collector: sensor.Collector,
          Label: sensor.Label,
          IsBad,
          GuidID: sensor.GuidID,
        };
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
      x: null,
      chart: null,
      polarChart: null,
      //   getData: [17,21,22,25,26,24,19,29,26,25,24,20,23,26,25,30,27,22,21,26,24,21,22,18,27,25,23,26,22,21,24,25,22,28,26,22,21,22,24],
      //   demoData: [],
    };
  },
  methods:{
    modalEvent(e) {
      console.log(e)
      if (e === 'open') {
        this.setPolarChart();
      }
    },
    setChart() {
      const vm = this;
      vm.clearChart();
      const option = {  
        chart: {
          renderTo: this.$refs.chart,
          type: 'line',
          inverted: true
        },
        title: {
          text: `${vm.cangName || vm.cnumber} 粮堆温度展示`   
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
          reversed: true,
          title: {
            enabled: true,
            text: '深度'
          },
          labels: {
            formatter: function () {
              return this.value;
            }
          },
          maxPadding: 0.01,
          showLastLabel: true,
          min: 1,
          tickInterval: 1,
        },
        yAxis: {
          title: {
            text: '线号'
          },
          labels: {
            formatter: function () {
              return this.value;
            }
          },
          lineWidth: 1,
          tickInterval: 1,
        },
        tooltip: {
          headerFormat: '',
          // pointFormat: '<b>采集器:{point.Collector}</b><br/>传感线:{point.Label}<br/>传感器:{point.SensorId}<br/>单位深度:{point.x}<br/>单位温度: {point.temp}',
          pointFormat: '<b>线号:{point.y}</b><br/>深度层级:{point.x}<br/>温度: {point.temp}',
        },
        plotOptions: {
          spline: {
            marker: {
              enable: false
            }
          },
          series: {
            point: {
              events: {
                click() {
                  if (Platform.is.desktop || vm.hovering.x === this.x && vm.hovering.y === this.y && vm.hovering.z === this.z) {
                    vm.x = this.x;
                    vm.$refs.modal.open();
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
        series: vm.getData,
      }
      // console.log(vm.getData);
      vm.chart = new vm.$Highcharts.Chart(option);
      // chart = new vm.$Highcharts.Chart({
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
    },
    clearChart() {
      if (!this.chart) return;
      this.chart.destroy();
    },
    setPolarChart() {
      const vm = this;
      vm.clearPolarChart();
      const option = {  
        chart: {
          renderTo: this.$refs.polarChart,
          polar: true,
          // type: 'scatter',
        },
        title: {
            text: false
        },
        pane: {
            startAngle: 0,
            endAngle: 360
        },
        xAxis: {
          reversed: false,
          title: {
            enabled: false,
          },
          labels: {
            formatter: function () {
              if (this.value === 0) return '北';
              return '';
            }
          },
          maxPadding: 0.01,
          showLastLabel: true,
          min: 0,
          max: 360,
          // step: 45,
          tickInterval: 45,
        },
        yAxis: {
          min: 0,
          max: this.LineCount.length,
          tickInterval: 1,
          labels: {
            enabled: false, // Y轴刻度值不显示  
          },
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                groupPadding: 0,
            },
            series: {
              point: {
                events: {
                  click() {     
                    if (this.IsBad) return;              
                    if (Platform.is.desktop || vm.hovering.x === this.x && vm.hovering.y === this.y && vm.hovering.z === this.z) {
                      // vm.$refs.modal.close();
                      vm.$router.push({
                        name: 'ChuanGan',
                        params:{ id: this.GuidID },
                        query:{x: this.x, y: this.y, z: this.z,SensorId: this.SensorId, Collector:this.Collector,Label:this.Label},
                      });
                    } else {
                      vm.hovering.x = this.x;
                      vm.hovering.y = this.y;
                      vm.hovering.z = this.z;
                    }
                    try{
                      window.androidShare.jsMethod(this.Label);
                    }
                    catch(err)
                    {
                      console.log(err);
                      // alert(err);
                    }
                    //  alert(this.Label);
                  }
                }
              }
            }
        },
        series: [{
            name: '传感器',
            lineWidth: 0,
            states: {
              hover: {
                lineWidth: 0,
                lineWidthPlus: 0,
              }
            },
            data: vm.getPolarData,
            pointPlacement: 'between'
        }],
        credits: {
          enabled:false // 禁用版权信息
        },
        tooltip: {
          headerFormat: '',
          // pointFormat: `<b>编号: {point.number}</b><br/>采集器:{point.Collector}<br/>传感线:{point.Label}<br/>传感器:{point.SensorId}<br/>单位深度:${vm.x}<br/>单位温度: {point.temp}`,
            pointFormat: `<b>线号: {point.number}</b><br/>深度层级:${vm.x}<br/>温度: {point.temp}`,
        },
      };
      vm.polarChart = new vm.$Highcharts.Chart(option);
    },
    clearPolarChart() {
      if (!this.polarChart) return;
      this.polarChart.destroy();
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
.polarChart{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>
