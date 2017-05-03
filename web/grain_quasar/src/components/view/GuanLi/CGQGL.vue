<template>
  <div class="cgqgl">
    <div class="layout-padding">
      <div class="list">
        <div class="item">
          <div class="item-content has-secondary floating-label">
            <div class="floating-label">
              <input class="full-width" v-model="number">
              <label>粮仓编号</label>
            </div>
          </div>
          <i class="item-secondary" @click="search">search</i>
        </div>
        <div ref="polarChart" class="polarChart"></div>
        <div class="item">
          <div class="item-content">
            <div class="floating-label">
              <input required class="full-width" type="number" v-model.number="height">
              <label>传感器单位高度</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Highcharts from 'highcharts';
  // 加载模块
  require('highcharts/highcharts-more')(Highcharts);

  export default {
    data() {
      return {
        number: '',
      };
    },
    methods: {
      search() {
        this.$http.get(`${vm.serverAddress}/Sensor/GetHeapLineCount/${vm.number}`).then((response) => {
          if (response.data) {

          }
        });
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
              enabled: true,
              text: '方位'
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
          },
          yAxis: {
              min: 0,
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
              data: vm.getPolarData,
              pointPlacement: 'between',
          }],
          credits: {
            enabled: false // 禁用版权信息
          },
          tooltip: {
            headerFormat: '<b>传感线:{series.name}</b><br/>',
            pointFormat: '编号: {point.y}\xB0C',
          },
        }
        vm.polarChart = new Highcharts.Chart(option);
      },
      clearPolarChart() {
        if (!this.polarChart) return;
        this.polarChart.destroy();
      },
    },
  };
</script>

<style lang="less" scoped>
  .input-search{
    width: 4rem;
  }
</style>
