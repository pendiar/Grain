<template>
  <div class="cgqgl">
    <!--<i v-for="name in icon">{{name}}</i>-->
    <div class="layout-padding">
      <div class="list">
        <div class="item two-lines">
          <div class="item-content has-secondary">
            <div class="floating-label">
              <input class="full-width" v-model="number" @keydown.enter="search">
              <label>粮仓编号</label>
            </div>
          </div>
          <i class="item-secondary" @click="search">search</i>
        </div>
        <div ref="polarChart" class="polarChart"></div>
        <div class="item">
          <div class="item-primary">
            序号
          </div>
          <div class="item-content inset">
            线号
          </div>
        </div>
        <div class="item" v-for="line in LineList">
          <div class="item-primary">
            {{line.Sort}}
          </div>
          <div class="item-content inset">
            <input type="text" v-model="line.LineCode">
          </div>
        </div>
        <div class="item text-center">
          <button class="primary" @click="save">更新</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import icon from 'assets/icon.json'
  import Highcharts from 'highcharts';
  // 加载模块
  require('highcharts/highcharts-more')(Highcharts);
  import { Toast } from 'quasar';

  export default {
    computed:{

    },
    data() {
      return {
        icon,
        number: '',
        LineList: [],
        LineCount: [],
      };
    },
    methods: {
      save() {
        this.$http.post(`${this.serverAddress}/Sensor/UpdateLineCodeInfo`, this.LineList.filter(line => line.LineCode)).then((response) => {
          if (response.data.Code === 1000) {
            Toast.create.positive('更新成功！');
          } else {
            Toast.create.warning('更新失败！');
          }
        }, () => {
          Toast.create.warning('更新失败！');
        });
      },
      search() {
        this.$http.get(`${this.serverAddress}/Sensor/GetHeapLineCount/${this.number}`).then((response) => {
          if (response.data.Code === 1000) {
            const data = JSON.parse(response.data.JsonValue);
            // console.log(data)
            // this.LineList = data.LineList;
            // this.LineCount = data.LineCount;
            const LineObj = {};
            data.LineList.forEach((line) => {
              LineObj[line.Sort] = line;
            });
            const LineList = [];
            data.LineCount.forEach((count, index) => {
              for (let i = 0; i < count; i++) {
                const Sort = LineList.length + 1;
                const line = LineObj[Sort] || {};
                LineList.push({
                  x: parseInt(360 * i / count),
                  y: index + 1,
                  HeapNumber: line.HeapNumber || '',
                  LineCode: line.LineCode || '',
                  Sort,
                })
              }
            });
            this.LineList = LineList;
            this.LineCount = data.LineCount;
            this.$nextTick(() => {
              this.setData();
              // this.setPolarChart();
            });
          }
        });
      },
      setPolarChart(data) {
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
            step: 45,
            // tickInterval: 45,
          },
          yAxis: {
            min: 0,
            max: 2,
            // max: this.LineCount.length,
            tickInterval: 1,
            labels: {
              // enabled: false, // Y轴刻度值不显示  
            },
          },
          plotOptions: {
              column: {
                  pointPadding: 0,
                  groupPadding: 0,
              },
              // series: {
              //   point: {
              //     events: {
              //       click() {
              //         if (Platform.is.desktop || vm.hovering.x === this.x && vm.hovering.y === this.y && vm.hovering.z === this.z) {
              //           vm.$refs.modal.close();
              //           vm.$router.push({
              //             name: 'ChuanGan',
              //             params:{ id: this.SensorId },
              //             query:{x: this.x, y: this.y, z: this.z,SensorId: this.SensorId, Collector:this.Collector,Label:this.Label},
              //           });
              //         } else {
              //           vm.hovering.x = this.x;
              //           vm.hovering.y = this.y;
              //           vm.hovering.z = this.z;
              //         }
              //       }
              //     }
              //   }
              // }
          },
          series: [{
              name: '传感器',
              lineWidth: 0,
              states: {
                hover: {
                  lineWidth: 0,
                  lineWidthPlus: 0,
                },
              },
              // data: JSON.parse(JSON.stringify(vm.LineList)),
              data: [[0,1],[90,1],[180,1],[270,1],[0,2],[45,2],[90,2],[135,2],[180,2],[225,2],[270,2],[315,2]],
              // data: [{"x":0,"y":1,"HeapNumber":"","LineCode":"","Sort":1},{"x":90,"y":1,"HeapNumber":"","LineCode":"","Sort":2},{"x":180,"y":1,"HeapNumber":"","LineCode":"","Sort":3},{"x":270,"y":1,"HeapNumber":"","LineCode":"","Sort":4},{"x":0,"y":2,"HeapNumber":"","LineCode":"","Sort":5},{"x":45,"y":2,"HeapNumber":"","LineCode":"","Sort":6},{"x":90,"y":2,"HeapNumber":"","LineCode":"","Sort":7},{"x":135,"y":2,"HeapNumber":"","LineCode":"","Sort":8},{"x":180,"y":2,"HeapNumber":"","LineCode":"","Sort":9},{"x":225,"y":2,"HeapNumber":"","LineCode":"","Sort":10},{"x":270,"y":2,"HeapNumber":"","LineCode":"","Sort":11},{"x":315,"y":2,"HeapNumber":"","LineCode":"","Sort":12}],
              pointPlacement: 'between',
          }],
          credits: {
            enabled: false // 禁用版权信息
          },
          tooltip: {
            headerFormat: '<b>传感线:{point.HeapNumber}</b><br/>',
            pointFormat: '序号: {point.Sort}<br/>线号: {point.LineCode}<br/>{point.x},{point.y}',
          },
        }
        // console.log(JSON.stringify(vm.LineList))
        vm.polarChart = new Highcharts.Chart(option);
      },
      setData() {
        // console.log(JSON.parse(JSON.stringify(this.LineList)))
        this.polarChart.series[0].update({
          data: this.LineList.map(item => ({
            x: item.x,
            y: item.y,
            HeapNumber: item.HeapNumber,
            LineCode: item.LineCode,
            Sort: item.Sort,
          })),
        });
        console.log(this.polarChart.series[0].data)
      },
      clearPolarChart() {
        if (!this.polarChart) return;
        this.polarChart.destroy();
      },
    },
    mounted() {
      this.setPolarChart();
      // setTimeout(() => {
      //   this.setPolarChart();
      // }, 4000);
    },
  };
</script>

<style lang="less" scoped>
  .polarChart{
    width: 400px;
    height: 400px;
    position: relative;
    // overflow: hidden;
  }
  .item>.item-primary{
    font-size: 16px;
  }
</style>
