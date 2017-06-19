<template>
  <!-- root node required -->
  <div class="chuanganpingmian">
    <!--<div class="list bordered">-->
      <div class="item" v-for="(floor, y) in sensorData.slice(1)">
          <div class="row item-content">
            <div class="item-label row items-center">
              码层{{Number(y)+1}}：
            </div>
            <div class="item-value auto">
              <div class="row" v-for="z in floor.slice(1)">
                  <div class="chuangan-item text-center width-1of1" v-for="x in length-1" :style="{color:z&&z[x]&&z[x].color}">
                    {{z&&z[x]&&z[x].temp}}
                    <q-tooltip v-if="z&&z[x]">
                      <p>{{z&&z[x].Number}}</p>
                      <p>温度：{{z&&z[x].temp}}°C</p>
                      <!-- <p>湿度：50%</p> -->
                    </q-tooltip>
                  </div>
              </div>
            </div>
          </div>
          <!--<div class="quote text-right">楼层{{y+1}}</div>
          <div class="auto">
              <div class="row" v-for="x in floor">
                  <div class="chuangan-item" v-for="z in x" :style="{backgroundColor:z.color}"></div>
              </div>
          </div>-->
      </div>
    <!--</div>-->
  </div>
</template>

<script>
export default {
  props: ['sensorList'],
  computed: {
    length() {
      let result = 0;
      this.sensorData.forEach((y) => {
        y.forEach((z) => {
          if (z.length > result) {
            result = z.length;
          }
        });
      });
      return result;
    },
    sensorData() {
      const data = [];
      this.sensorList.forEach((sensor) => {
        const temp = sensor.RealTemp;
        let color = '';
        if (sensor.IsBad) {
          color = "#c3bcbc";
        }else if (temp < 30) {
          color = "#195803";
        } else if (temp >= 30 && temp < 35) {
          // color = "#e97b0a";
          color = "#d6905d";
        } else if (temp >= 35) {
          // color = "#ff5a5a";
          color = "#f70808";
        // } else {
        //   color = "#195803"
        }
        if (!data[sensor.Direction_Z]) {
          data[sensor.Direction_Z] = [];
          data[sensor.Direction_Z][sensor.Direction_X] = [];
        } else if (!data[sensor.Direction_Z][sensor.Direction_X]) {
          data[sensor.Direction_Z][sensor.Direction_X] = [];
        }
        data[sensor.Direction_Z][sensor.Direction_X][sensor.Direction_Y] = { x: sensor.Direction_X, y: sensor.Direction_Y, z: sensor.Direction_Z, temp, color };
      });
      // alert(JSON.stringify(data))
      return data;
    }
  },
  data() {
    return {
      
    };
  },
  created() {
  },
  mounted() {
  },
};
</script>

<style scoped lang="less">
.chuanganpingmian{
  width: 100%;
  min-width: 310px;
  max-width: 800px;
  margin: 0 auto;
  @padding: 15px;
  .item{
    height: auto;
    .item-content{
      padding: 0;
    }
    &:last-child .item-value{
      padding-bottom: 0;
    }
  }
  .item-value{
    border: 1px solid #636363;
    border-bottom: 0;
    padding-bottom: 5px;
  }
  .chuangan-item{
    padding: 3px 5px;
    border-right: 1px solid #636363;
    border-bottom: 1px solid #636363;
    &:last-child{
      border-right: 0;
    }
  }
}
</style>
