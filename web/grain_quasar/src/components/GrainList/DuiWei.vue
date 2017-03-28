<template>
  <table class="q-table bordered highlight horizontal-delimiter striped-even text-center" >
    <thead>
      <tr>
        <th>堆位</th>
        <th>最高温度</th>
        <th>最低温度</th>
        <th>平均温度</th>
        <th>坏点数</th>
        <th>仓内温度</th>
        <th>仓外温度</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in list">
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
</template>
<script>
export default {
  data() {
    return {
      list: [
        {
          "ID": 9,
          "Number": "D2",
          "Name": "堆位2",
          "Location": "深证市宝安区",
          "Type": 2,
          "UserId": "0",
          "AverageTemperature": 24,
          "Maximumemperature": 29,
          "MinimumTemperature": 20,
          "InSideTemperature": 24,
          "OutSideTemperature": 26,
          "StampTime": "2017-03-25T10:53:46.367",
          "IsActive": 1,
          "Floors": [],
          "BadPoints": 0
        },
        {
          "ID": 8,
          "Number": "D1",
          "Name": "堆位1",
          "Location": "深证市宝安区",
          "Type": 3,
          "UserId": "0",
          "AverageTemperature": 25,
          "Maximumemperature": 30,
          "MinimumTemperature": 21,
          "InSideTemperature": 25,
          "OutSideTemperature": 26,
          "StampTime": "2017-03-25T10:52:49.147",
          "IsActive": 1,
          "Floors": [],
          "BadPoints": 0
        },
        {
          "ID": 7,
          "Number": "D5",
          "Name": "堆位3",
          "Location": "深证市宝安区",
          "Type": 1,
          "UserId": "0",
          "AverageTemperature": 0,
          "Maximumemperature": 0,
          "MinimumTemperature": 0,
          "InSideTemperature": 81,
          "OutSideTemperature": 26,
          "StampTime": "2017-03-16T17:24:46",
          "IsActive": 1,
          "BadPoints": 0
        },
        {
          "ID": 6,
          "Number": "D6",
          "Name": "堆位6",
          "Location": "深证市宝安区",
          "Type": 1,
          "UserId": "0",
          "AverageTemperature": 0,
          "Maximumemperature": 0,
          "MinimumTemperature": 0,
          "InSideTemperature": 25,
          "OutSideTemperature": 26,
          "StampTime": "2017-03-13T19:55:32",
          "IsActive": 1,
          "BadPoints": 2
        },
      ]
    };
  },
}
</script>

<style lang="less" scoped>
.q-table{
  font-size: 0.7rem;
  th,td{
    padding:0.5rem 0.3rem;
  }
}
</style>