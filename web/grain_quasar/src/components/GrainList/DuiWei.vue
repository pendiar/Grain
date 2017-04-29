<template>
  <table class="q-table bordered highlight horizontal-delimiter striped-even text-center" >
    <thead>
      <tr>
        <th>堆位</th>
        <th>最高温</th>
        <th>最低温</th>
        <th>仓内温</th>
        <th>仓外温</th>
        <th>坏点数</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in GetList" v-link="getLink(item)">
        <td>{{item.Number}}</td>
        <td :class="{'bg-worn':item.Maximumemperature>=30}">{{item.Maximumemperature}}°C</td>
        <td>{{item.MinimumTemperature}}°C</td>
        <td :class="{'bg-worn':item.InSideTemperature>=30}">{{item.InSideTemperature}}°C</td>
        <td :class="{'bg-worn':item.OutSideTemperature>=30}">{{item.OutSideTemperature}}°C</td>
        <td :class="{'bg-bad':item.BadPoints}">{{item.BadPoints}}</td>
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
  methods: {
    getLink(item) {
      // {name:'DuiWeiMo',params:{id:item.Number},query:{WH_Number:number.split('-')[0],Number:number}}
      if (this.$route.query.type === 1 || this.$route.query.type === 2) {
        return {name:'DuiWeiMo',params:{id:item.Number},query:{WH_Number:this.number.split('-')[0],Number:this.number}};
      // } else if (grain.Type === 2) {
      //   return { name: 'DuiWeiMo', params: { id: `${grain.Number}-1-1` }, query: { WH_Number: grain.Number, Number: `${grain.Number}-1` } };
      }
      // return { name: 'DuiWei', params: { id: `${grain.Number}-1-1` }, query: { type: grain.Type } };
      return { name: 'YuanDuiWei', query: { WH_Number: this.number.split('-')[0], Number: this.number, DW_Number: item.Number } };
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
.q-table{
  font-size: 0.7rem;
  width: 100%;
  th,td{
    text-align: center;
    padding:0.5rem 0;
  }
}
</style>