<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="quote">
        xxxx仓库温度状态
      </div>
      <div class="row wrap gutter desktop-only">
        <div class="grain-stats md-width-1of2 gt-md-width-1of4 auto" v-for="grain in list">
          <div class="card">
            <div class="card-title bg-primary text-white">
              {{grain.Name}}
            </div>
            <div class="card-content">
              <div class="grain-top"><i class="top-icon" :class="[grain.Type===3?'top-icon-yuan':'top-icon-ping']"></i></div>
              <div class="grain-content">
                <div class="grain-floor" v-for="floor in grain.Floors" :style="{height:100/grain.Floors.length+'%'}">
                  <div class="grain-granary" v-for="granary in floor.GranaryList" v-link="{name:'AoJian',params:{id:granary.ID}}">
                    {{granary.Number}}
                    <q-tooltip>
                      <p>{{granary.Location}}</p>
                      <p>平均温度：{{granary.AverageTemperature}}°C</p>
                      <p>平均湿度：{{granary.AverageHumidity}}%</p>
                    </q-tooltip>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table class="q-table bordered highlight horizontal-delimiter striped-even compact text-center mobile-only small-text">
        <thead>
          <tr>
            <th>仓号</th>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          "ID": 9,
          "Number": "T2",
          "Name": "平房仓2",
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
          "Number": "Q1",
          "Name": "立筒仓1",
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
          "Number": "L5",
          "Name": "E楼房仓",
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
          "Floors": [
            {
              "ID": 1,
              "Number": "L1-F1",
              "Location": "L1楼1层",
              "WH_Number": "L1",
              "UserId": 0,
              "IsActive": 1,
              "GranaryList": [
                {
                  "ID": 1,
                  "Number": "L1-F1-A",
                  "Location": "L1楼1层A廒间",
                  "F_Number": "L1-F1",
                  "AverageTemperature": 23,
                  "AverageHumidity": 22,
                  "UserId": 0,
                  "IsActive": 1
                },
                {
                  "ID": 2,
                  "Number": "L1-F1-B",
                  "Location": "L1楼1层B廒间",
                  "F_Number": "L1-F1",
                  "AverageTemperature": 42,
                  "AverageHumidity": 33,
                  "UserId": 0,
                  "IsActive": 1
                },
              ]
            },
            {
                "ID": 2,
                "Number": "L1-F2",
                "Location": "L1楼2层",
                "WH_Number": "L1",
                "UserId": 0,
                "IsActive": 1,
                "GranaryList": [
                    {
                        "ID": 3,
                        "Number": "L1-F2-A",
                        "Location": "L1楼2层A廒间",
                        "F_Number": "L1-F2",
                        "AverageTemperature": 22,
                        "AverageHumidity": 32,
                        "UserId": 0,
                        "IsActive": 1
                    }
                ]
            },
            {
              "ID": 3,
              "Number": "L1-F3",
              "Location": "L1楼3层",
              "WH_Number": "L1",
              "UserId": 0,
              "IsActive": 1,
              "GranaryList": [],
            },
          ],
          "BadPoints": 0
        },
        {
          "ID": 6,
          "Number": "L6",
          "Name": "F楼房仓",
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
          "Floors": [
                {
                    "ID": 4,
                    "Number": "L2-F1",
                    "Location": "L2楼1层",
                    "WH_Number": "L2",
                    "UserId": 0,
                    "IsActive": 1,
                    "GranaryList": []
                },
                {
                    "ID": 6,
                    "Number": "L2-F5",
                    "Location": "L2楼第5层",
                    "WH_Number": "L2",
                    "UserId": 1,
                    "IsActive": 0,
                    "GranaryList": []
                }
            ],
          "BadPoints": 2
        },
      ]
    };
  },
}
</script>

<style scoped lang="less">
.grain-list{
  width: 100%;
  height: 100%;
}
.grain-stats{
  // margin-bottom: 15px;
}
.grain-top{
  height: 50px;
  padding: 0;
  position: relative;
  /*background-color: #dedede;*/
  .top-icon{
    display: block;
    margin: 0 auto;
    position: relative;
    &.top-icon-ping{
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 90px 50px;
      border-color: transparent transparent #000;
      &:after{
        content: "";
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 86px 48px;
        border-color: transparent transparent #fff;
        position: absolute;
        top: 1px;
        left: -86px;
      }
    }
    &.top-icon-yuan{
      width: 180px;
      height: 55px;
      border: 1px solid #000;
      border-radius: 50% ~"/" 37px 37px 18px 18px;
      background-color: #fff;
    }
  }
}
.grain-title{
  position: absolute;
  width: 100%;
  height: 50px;
  left: 0;
  top: 0;
  line-height: 50px;
  text-align: center;
}
.grain-content{
  width: 140px;
  height: 160px;
  overflow: hidden;
  /*min-height: 160px;*/
  border: 1px solid #000;
  margin: 0 auto;
}
.grain-floor{
  border-bottom: 1px solid;
  background-color: #00b6ff;
  display: flex;
  &:last-child{
    border-bottom: none;
  }
}
.grain-granary{
  width: 50%;
  border-right: 1px solid;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  &:last-child{
    border-right: none;
  }
  &:hover{
    background-color: #6495ed;
  }
}
.q-table{
  font-size: 0.7rem;
}
</style>
