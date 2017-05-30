<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="row wrap gutter">
        <cang-card v-for="cang in GrainReport" :key="cang.Number" :cang="cang" :update='update3d' :class="{disableClick: !$CheckRights(cang.Number)}"></cang-card>
      </div>
    </div>
  </div>
</template>

<script>
import CangCard from 'components/AoJian/CangCard';

export default {
  components: {
    CangCard,
  },
  data() {
    return {
      update3d: 0,
      GrainReport: [],
      LDList: {
        "ID": 1,
        "Number": "L1-F1-A",
        "Location": "L1楼1层A廒间",
        "F_Number": "L1-F1",
        "AverageTemperature": 23,
        "AverageHumidity": 22,
        "UserId": 0,
        "IsActive": 1,
        Cang: [
          {
            ID: 1,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 23,
            AverageHumidity: 22,
          },
          {
            ID: 2,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 30,
            AverageHumidity: 22,
          },
          {
            ID: 3,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 36,
            AverageHumidity: 22,
          },
          {
            ID: 4,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 40,
            AverageHumidity: 22,
          },
          {
            ID: 5,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 46,
            AverageHumidity: 22,
          },
          {
            ID: 6,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 50,
            AverageHumidity: 22,
          },
        ],
      },
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.$http.post(`${vm.serverAddress}/Granary/GetHeapList`, [
        "PageIndex^1",
        "PageCount^2000",
        `wCode^${to.query.WH_Number}`,
        `gCode^${to.query.Number}`,
        "UserId^0"
      ]).then((response) => {
        if (response.data.Code === 1000) {
          try{
            if (to.name === 'AoJian') {
              vm.GrainReport = JSON.parse(response.data.JsonValue);
            } else if (to.name === 'YuanDuiWei') {
              console.log(JSON.parse(response.data.JsonValue).map(cang=>cang.Number))
              if (to.query.DW_Number) {
                vm.GrainReport = JSON.parse(response.data.JsonValue).filter((cang) => {
                  return cang.Number === to.query.DW_Number;
                });
              } else {
                vm.GrainReport = JSON.parse(response.data.JsonValue);
              }
            } else {
              vm.GrainReport = JSON.parse(response.data.JsonValue).filter((cang) => {
                return cang.Number === to.params.id;
              });
            }
          } catch (e) {
            vm.GrainReport = [];
          }
        } else {
          vm.GrainReport = [];
        }
        vm.$nextTick(function () {
          this.update += 1;
        });
      }, () => {
        vm.GrainReport = [];
        vm.$nextTick(function () {
          this.update += 1;
        });
      });
    });
  },
};
</script>

<style>
</style>
