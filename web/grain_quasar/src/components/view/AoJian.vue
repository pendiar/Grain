<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!--<p class="quote" v-if="isDesktop">
        {{cang.name || cang.Number}}廒间
        <button class="primary small raised float-right" @click="addDuiwei"><i class="on-left">add</i> 添加堆位</button>
      </p>-->
      <!-- if you want automatic padding -->
      <div class="row wrap gutter">
        <cang-card v-for="cang in filterGrainReport" :key="cang.Number" :cang="cang" :update='update3d' :class="{disableClick: !$CheckRights(cang.Number)}"></cang-card>
      </div>
      <!--<q-modal ref="addDuiwei" :content-css="{minWidth: '80vw', minHeight: '80vh'}" @open="modalEvent('open')" @close="modalEvent('close')">
        <add-duiwei :grain-data="filterList[EditIndex]" v-if="showModal" @hide="closeModal"></add-duiwei>
      </q-modal>-->
    </div>
  </div>
</template>

<script>
import CangCard from 'components/AoJian/CangCard';
// import AddDuiwei from 'components/GrainList/AddDuiwei';

export default {
  components: {
    CangCard,
    // AddDuiwei,
  },
  computed: {
    filterGrainReport() {
      return this.GrainReport.sort((a, b) => a.Sort - b.Sort);
    },
  },
  data() {
    return {
      showModal: false,
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
  methods: {
    closeModal() {
      setTimeout(() => {
        this.$refs.addDuiwei.close();
      }, 0);
    },
    modalEvent(e) {
      this.showModal = e === 'open';
      this.fetchData();
    },
    fetchData(to, from) {
      const vm = this;
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
              // console.log(JSON.parse(response.data.JsonValue).map(cang=>cang.Number))
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
    }
  },
  created() {
    this.fetchData(this.$route);
  },
  watch: {
    $route: 'fetchData',
  }
};
</script>

<style>
</style>
