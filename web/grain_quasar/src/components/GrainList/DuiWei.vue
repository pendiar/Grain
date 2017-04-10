<template>
  <table class="q-table bordered highlight horizontal-delimiter striped-even text-center" >
    <thead>
      <tr>
        <th>堆位</th>
        <th>最高温度</th>
        <th>最低温度</th>
        <th>平均温度</th>
        <th>坏点数</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in GetList">
        <td>{{item.Number}}</td>
        <td :class="{'text-negative':item.Maximumemperature>=30}">{{item.Maximumemperature}}</td>
        <td>{{item.MinimumTemperature}}</td>
        <td>{{item.AverageTemperature}}</td>
        <td :class="{'text-negative':item.BadPoints}">{{item.BadPoints}}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data() {
    return {
      GetList: []
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.$http.get(`${vm.serverAddress}/Grain/HeapsTemp_GetList/${to.params.id}`).then((response) => {
        if (response.data.Code === 1000) {
          try{
            vm.GetList = JSON.parse(response.data.JsonValue);
          } catch (e) {
            vm.GetList = [];
          }
        } else {
          vm.GetList = [];
        }
      }, () => {
        vm.GetList = [];
      });
    });
  },
}
</script>

<style lang="less" scoped>
.q-table{
  font-size: 0.7rem;
  width: 100%;
  th,td{
    padding:0.5rem 0;
  }
}
</style>