<template>
  <!-- root node required -->
  <div class="chuangan3d"></div>
</template>

<script>
import Highcharts from 'highcharts';
// 加载模块
require('highcharts/highcharts-3d')(Highcharts);

export default {
  props: ['sensorList', 'update'],
  computed: {
    getData() {
        return this.sensorList.map((sensor) => {
            const temp = sensor.RealTemp;
            let color = '';
            if (temp < 20) {
                color = "#0000ff";
            } else if (temp >= 20 && temp < 22) {
                color = "#003399";
            } else if (temp >= 22 && temp < 24) {
                color = "0099cc";
            } else if (temp >= 24 && temp < 28) {
                color = "ffcc00"
            } else {
                color = "ff0000"
            }
            return { x: sensor.Direction_X, y: sensor.Direction_Y, z: sensor.Direction_Z, temp, color, SensorId: sensor.SensorId };    
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
                    width: 60,
                    height: 60,
                    depth: 50
                },
                series: {
                    marker: {
                        radius: 5
                    },
                    point: {
                        events: {
                            click() {
                                console.log(this)
                                vm.$router.push({ name: 'ChuanGan', params:{ id: this.SensorId } });
                            }
                        }
                    }
                }
            },
            yAxis: {
                title: {
                    text: "Y"
                },
                min: 0.5,
                tickInterval: 1,
                max: 3.5
            },
            xAxis: {
                title: {
                    text: "X"
                },
                min: 0.5,
                tickInterval: 1,
                max: 3.5,
                // gridLineWidth: 1
            },
            zAxis: {
                tickInterval: 1,
                min: 0.5,
                lineColor:'#FFFFFF',
                title: {
                    text: "Z"
                },       
                max: 3.5,
                // showFirstLabel: false
            },
            //图例
            legend: {
                enabled: false
            },
            tooltip: {
                formatter: function () {
                    return `ID: <b>${this.point.SensorId}</b><br>x坐标: <b>${this.point.x}</b><br/>y坐标: <b>${this.point.y}</b><br/>z坐标: <b>${this.point.z}</b><br/>温度:<b> ${this.point.temp}</b>`;
                    // return '<br>温度是: <b>' + this.point.temp + '℃';
                }
            },
            series: [
                { data: vm.getData }
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
  },
  mounted() {
    //   console.log(1111)
    this.setChart();
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
