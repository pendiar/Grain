<template>
  <table class="q-table bordered highlight horizontal-delimiter striped-even text-center" >
    <thead>
      <tr>
        <th>堆位</th>
        <th>最高温度</th>
        <th>最低温度</th>
        <th>坏点数</th>
        <th>仓内温度</th>
        <th>仓外温度</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in GetList" v-link="{name:'DuiWeiMo',query:{wNumber:number.split('-')[0],gNumber:number,Number:item.Number}}">
        <td>{{item.Number}}</td>
        <td :class="{'bg-worn':item.Maximumemperature>=30}">{{item.Maximumemperature}}°C</td>
        <td>{{item.MinimumTemperature}}°C</td>
        <td :class="{'bg-bad':item.BadPoints}">{{item.BadPoints}}</td>
        <td :class="{'bg-worn':item.InSideTemperature>=30}">{{item.InSideTemperature}}°C</td>
        <td :class="{'bg-worn':item.OutSideTemperature>=30}">{{item.OutSideTemperature}}°C</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  data() {
    return {
      number:'',
      GetList: [],
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
      vm.number = to.params.id;
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
    text-align: center;
    padding:0.5rem 0;
  }
}
</style>