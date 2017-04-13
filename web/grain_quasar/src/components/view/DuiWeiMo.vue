<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="card">
        <chuangan3d :sensorList="SensorList" :update="update"></chuangan3d>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        update: 0,
        SensorList: [],
      };
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.$http.post(`${vm.serverAddress}/Granary/GetHeapList`, [
            'PageIndex^1',
            'PageCount^20',
            `wCode^${to.query.wNumber}`,
            `gCode^${to.query.gNumber}`,
            'UserId^0',
        ]).then((response) => {
          if (response.data.Code === 1000) {
            try{
              JSON.parse(response.data.JsonValue).some((cang) => {
                if (cang.Number === to.query.Number) {
                  vm.SensorList = cang.SensorList;
                  return true;
                }
                return false;
              });
            } catch (e) {
              vm.SensorList = [];
            }
          } else {
            vm.SensorList = [];
          }
          vm.$nextTick(function () {
            this.update += 1;
          });
        }, () => {
          vm.SensorList = [];
          vm.$nextTick(function () {
            this.update += 1;
          });
        })
      });
    }
  };
</script>
