<template>
  <div>
    <table class="q-table bordered highlight horizontal-delimiter striped-even text-center" v-show="$route.name === 'AoJianList'">
      <thead>
        <tr>
          <th>厫间</th>
          <th>最高温</th>
          <th>最低温</th>
          <th>平均温</th>
          <th>仓内/外温</th>
          <th>仓内/外湿</th>
          <th>坏点数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in GetList" v-link="{name: 'DuiWei', params: {id: item.Number}, query: { Name: item.Name } }" :class="{disableClick: !$CheckRights(item.Number)}">
          <td>{{item.Name || item.Number}}</td>
          <td :class="{'bg-worn':item.Maximumemperature>=30&&item.Maximumemperature<35,'bg-alarm':item.Maximumemperature>=35}">{{item.Maximumemperature}}°C</td>
          <td>{{item.MinimumTemperature}}°C</td>
          <td :class="{'bg-worn':item.AverageTemperature>=30&&item.AverageTemperature<35,'bg-alarm':item.AverageTemperature>=35}">{{item.AverageTemperature}}°C</td>
          <td :class="{'bg-worn':item.OutSideTemperature>=30&&item.OutSideTemperature<35
          ,'bg-alarm':item.OutSideTemperature>=35}">-/{{item.OutSideTemperature}}°C</td>
          <td :class="{'bg-worn':item.InSideHumidity>=80||item.OutSideHumidity>=80}">{{item.InSideHumidity}}/{{item.OutSideHumidity}}%RH</td>
          <td :class="{'bg-bad':item.BadPoints}">{{item.BadPoints}}</td>
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
  methods: {
    fetchData() {
      this.$http.get(`${this.serverAddress}/Grain/GranaryTemp_GetList/${this.$route.params.id}`).then((response) => {
        if (response.data.Code === 1000) {
          try{
            this.GetList = JSON.parse(response.data.JsonValue);
          } catch (e) {
            this.GetList = [];
          }
        } else {
          this.GetList = [];
        }
      }, () => {
        this.GetList = [];
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.name === 'AoJianList') vm.fetchData();
    });
  },
  beforeRouteUpdate(to, from, next) {
    next();
    if (to.name === 'AoJianList') this.fetchData();
  },
};
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