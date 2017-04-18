<template>
  <div>
    <table class="q-table bordered highlight horizontal-delimiter striped-even text-center" v-show="$route.name === 'AoJianList'">
      <thead>
        <tr>
          <th>厫间</th>
          <th>最高温</th>
          <th>最低温</th>
          <th>平均温</th>
          <th>仓外温</th>
          <th>内湿/外湿</th>
          <th>坏点数</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in GetList" v-link="{name: 'DuiWei', params: {id: item.Number}}">
          <td>{{item.Number}}</td>
          <td :class="{'bg-worn':item.Maximumemperature>=30}">{{item.Maximumemperature}}°C</td>
          <td>{{item.MinimumTemperature}}°C</td>
          <td :class="{'bg-bad':item.BadPoints}">{{item.AverageTemperature}}</td>
          <td :class="{'bg-worn':item.OutSideTemperature>=30}">{{item.OutSideTemperature}}°C</td>
          <td :class="{'bg-worn':item.InSideHumidity>=80||item.OutSideHumidity>=80}">{{item.InSideHumidity}}%RH/{{item.OutSideHumidity}}%RH</td>
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