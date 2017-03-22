<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="row wrap gutter">
        <div class="grain-stats md-width-1of2 gt-md-width-1of4 auto" v-for="grain in list">
          <!--<div class="widget widget-stats bg-white" v-for="item in list">
            <div class="stats-icon stats-icon-lg"><i class="fa fa-book fa-fw"></i></div>
            <div class="stats-title">平方仓</div>
            <div class="stats-number"></div>
          </div>-->
          <div class="grain-top"><i class="top-icon top-icon-yuan"></i><span class="grain-title">{{grain.Name}}</span></div>
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
</template>

<script>
export default {
  data() {
    return {
      list: [
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
          "StampTime": "2017-03-16T17:24:46",
          "IsActive": 1,
          "Floors": [],
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
          "StampTime": "2017-03-13T19:55:32",
          "IsActive": 1,
          "Floors": []
        },
        {
          "ID": 1,
          "Number": "L1",
          "Name": "A楼房仓",
          "Location": "深圳市粮食局",
          "Type": 1,
          "UserId": "0",
          "AverageTemperature": 25,
          "Maximumemperature": 30,
          "MinimumTemperature": 10,
          "StampTime": "2017-03-12T18:40:04.977",
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
          ]
        },
        {
            "ID": 2,
            "Number": "L2",
            "Name": "B楼房仓",
            "Location": "深圳市粮食局",
            "Type": 1,
            "UserId": "0",
            "AverageTemperature": 20,
            "Maximumemperature": 25,
            "MinimumTemperature": 10,
            "StampTime": "2017-03-12T18:40:04.977",
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
            ]
        },
        {
            "ID": 4,
            "Number": "L4",
            "Name": "D2楼房仓",
            "Location": "深证市宝安区",
            "Type": 1,
            "UserId": "0",
            "AverageTemperature": 24,
            "Maximumemperature": 32,
            "MinimumTemperature": 11,
            "StampTime": "2017-03-12T18:40:04.977",
            "IsActive": 1,
            "Floors": []
        }
      ]
    };
  },
}
</script>

<style lang="less">
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
</style>
