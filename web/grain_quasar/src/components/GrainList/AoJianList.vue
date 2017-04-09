<template>
  <div>
    <table class="q-table bordered highlight horizontal-delimiter striped-even text-center" v-show="$route.name === 'AoJianList'">
      <thead>
        <tr>
          <th>厫间</th>
          <th>最高温度</th>
          <th>最低温度</th>
          <th>平均温度</th>
          <th>坏点数</th>
          <th>仓内温度</th>
          <th>仓外温度</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sharedState.AoJianList" v-link="{name: 'DuiWei', params: {id: item.Number}}">
          <td>{{item.Number}}</td>
          <td :class="{'text-negative':item.Maximumemperature>=30}">{{item.Maximumemperature}}</td>
          <td>{{item.MinimumTemperature}}</td>
          <td>{{item.AverageTemperature}}</td>
          <td :class="{'text-negative':item.BadPoints}">{{item.BadPoints}}</td>
          <td :class="{'text-negative':item.InSideTemperature>=80}">{{item.InSideTemperature}}%RH</td>
          <td>{{item.OutSideTemperature}}%RH</td>
        </tr>
      </tbody>
    </table>
    <router-view></router-view>
  </div>
</template>
<script>
import store from 'src/config/store';

export default {
  data() {
    return {
      GetList: [],
      sharedState: store.state,
    };
  },
  beforeRouteEnter: (to, from, next) => {
    next((vm) => {
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