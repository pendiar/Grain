<template>
<div>
  <div class="topItem">
    <div class="float-left">仓内温：<span :class="{'bg-worn':filterGetList[0]&&filterGetList[0].InSideTemperature>=30&&filterGetList[0].InSideTemperature<35,'bg-alarm':filterGetList[0]&&filterGetList[0].InSideTemperature>=35}">{{filterGetList[0] && filterGetList[0].InSideTemperature||'-'}}°C</span></div>
    <div class="float-right">仓外温：<span :class="{'bg-worn':filterGetList[0]&&filterGetList[0].OutSideTemperature>=30&&filterGetList[0].OutSideTemperature<35,'bg-alarm':filterGetList[0]&&filterGetList[0].OutSideTemperature>=35}">{{filterGetList[0].OutSideTemperature||'-'}}°C</span></div>
  </div>
  <table class="q-table bordered highlight horizontal-delimiter striped-even text-center" >
    <thead>
      <tr>
        <th>堆位</th>
        <th>最高温<br>(°C)</th>
        <th>最低温<br>(°C)</th>
        <th>平均温<br>(°C)</th>
        <!--<th>仓内温</th>-->
        <!--<th>仓外温</th>-->
        <th>坏点数</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filterGetList" v-link="getLink(item)">
        <td>{{item.Name || item.Number}}</td>
        <td :class="{'bg-worn':item.Maximumemperature>=30&&item.Maximumemperature<35,'bg-alarm':item.Maximumemperature>=35}">{{item.Maximumemperature || '-'}}</td>
        <td>{{item.MinimumTemperature || '-'}}</td>
        <td :class="{'bg-worn':item.AverageTemperature>=30&&item.AverageTemperature<35,'bg-alarm':item.AverageTemperature>=35}">{{item.AverageTemperature || '-'}}</td>
        <!--<td :class="{'bg-worn':item.InSideTemperature>=30&&item.InSideTemperature<35,'bg-alarm':item.InSideTemperature>=35}">{{item.InSideTemperature}}°C</td>-->
        <!--<td :class="{'bg-worn':item.OutSideTemperature>=30&&item.OutSideTemperature<35,'bg-alarm':item.OutSideTemperature>=35}">{{item.OutSideTemperature}}°C</td>-->
        <td :class="{'bg-bad':item.BadPoints}">{{item.BadPoints}}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>
<script>
export default {
  computed: {
    filterGetList() {
      return this.GetList.filter(item => this.$CheckRights(item.Number)).sort((a, b) => (a.Sort - b.Sort));
    },
  },
  data() {
    return {
      number: '',
      GetList: [],
    };
  },
  methods: {
    getLink(item) {
      // {name:'DuiWeiMo',params:{id:item.Number},query:{WH_Number:number.split('-')[0],Number:number}}
      if (!this.$route.query.type || this.$route.query.type === 1 || this.$route.query.type === 2) {
        return {
          name: 'DuiWeiMo',
          params: { id: item.Number },
          query: {
            WH_Number: this.number.split('-')[0],
            Number: this.number,
            Maximumemperature: item.Maximumemperature,
            MinimumTemperature: item.MinimumTemperature,
            AverageTemperature: item.AverageTemperature,
            InSideTemperature: item.InSideTemperature,
            OutSideTemperature: item.OutSideTemperature,
            BadPoints: item.BadPoints,
          },
        };
      // } else if (grain.Type === 2) {
      //   return { name: 'DuiWeiMo', params: { id: `${grain.Number}-1-1` }, query: { WH_Number: grain.Number, Number: `${grain.Number}-1` } };
      }
      // return { name: 'DuiWei', params: { id: `${grain.Number}-1-1` }, query: { type: grain.Type } };
      return {
        name: 'YuanDuiWei',
        query: {
          WH_Number: this.number.split('-')[0],
          Number: this.number,
          DW_Number: item.Number,
          Maximumemperature: item.Maximumemperature,
          MinimumTemperature: item.MinimumTemperature,
          AverageTemperature: item.AverageTemperature,
          InSideTemperature: item.InSideTemperature,
          OutSideTemperature: item.OutSideTemperature,
          BadPoints: item.BadPoints,
        },
      };
    },
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
.topItem{
  font-size: 0.8rem;
  padding: 0 0.5rem 0.2rem;
  overflow: hidden;
}
.q-table{
  font-size: 0.7rem;
  width: 100%;
  th,td{
    text-align: center;
    vertical-align: middle;
    padding:0.5rem 0;
  }
}
</style>