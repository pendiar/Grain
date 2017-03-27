<template>
  <!-- root node required -->
  <div class="chuanganpingmian">
    <!--<div class="list bordered">-->
      <div class="item" v-for="(floor, y) in demoData">
          <div class="row item-content">
            <div class="item-label row items-center">
              楼层{{Number(y)+1}}：
            </div>
            <div class="item-value auto">
              <div class="row" v-for="z in floor">
                  <div class="chuangan-item text-center auto" v-for="x in length" :style="{color:z[x-1]&&z[x-1].color}">
                    {{z[x-1]&&z[x-1].temp}}
                    <q-tooltip v-if="z[x-1]">
                      <p>{{z[x-1].Number}}</p>
                      <p>温度：{{z[x-1].temp}}°C</p>
                      <p>湿度：50%</p>
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
  props: ['code'],
  computed: {
    length() {
      let result = 0;
      this.demoData.forEach((y) => {
        y.forEach((z) => {
          if (z.length > result) {
            result = z.length;
          }
        });
      });
      return result;
    }
  },
  data() {
    return {
      getData: [17,21,22,25,26,24,19,29,26,25,24,20,23,26,25,30,27,22,21,26,24,21,22,18,27,25,23,26,22,21,24,25,22,28,26,22,21,22,24],
      demoData: [],
    };
  },
  created() {
    const getColor = [];
    const getData = this.getData;
    getData.forEach((temp) => {
        if (temp < 20) {
            getColor.push({ color: "0000ff" });
        } else if (temp >= 20 && temp < 24) {
            getColor.push({ color: temp < 22 ? "#003399" : "#0099cc" });
        } else if (temp >= 24 && temp < 28) {
            getColor.push({ color: temp < 26 ? "#ffcc00" : "#ffcc00" });
        } else if (temp >= 28) {
            getColor.push({ color: temp < 30 ? "#ff0000" : "#ff0000" });
        }
    });
    var demoData = [];
    demoData.push({ x: 3, y: 3, z: 3, temp: getData[0], color: getColor[0].color, Number: 'L1-F1-A-1-01' });
    demoData.push({ x: 3, y: 3, z: 6, temp: getData[1], color: getColor[1].color, Number: 'L1-F1-A-1-02' });
    demoData.push({ x: 3, y: 3, z: 9, temp: getData[2], color: getColor[2].color, Number: 'L1-F1-A-1-03' });
    demoData.push({ x: 6, y: 3, z: 3, temp: getData[3], color: getColor[3].color, Number: 'L1-F1-A-1-04' });
    demoData.push({ x: 6, y: 3, z: 6, temp: getData[4], color: getColor[4].color, Number: 'L1-F1-A-1-05' });
    demoData.push({ x: 6, y: 3, z: 9, temp: getData[5], color: getColor[5].color, Number: 'L1-F1-A-1-06' });
    demoData.push({ x: 9, y: 3, z: 3, temp: getData[6], color: getColor[6].color, Number: 'L1-F1-A-1-07' });
    demoData.push({ x: 9, y: 3, z: 6, temp: getData[7], color: getColor[7].color, Number: 'L1-F1-A-1-08' });
    demoData.push({ x: 9, y: 3, z: 9, temp: getData[8], color: getColor[8].color, Number: 'L1-F1-A-1-09' });
    demoData.push({ x: 3, y: 6, z: 3, temp: getData[9], color: getColor[9].color, Number: 'L1-F1-A-1-10' });
    demoData.push({ x: 3, y: 6, z: 6, temp: getData[10], color: getColor[10].color, Number: 'L1-F1-A-1-11' });
    demoData.push({ x: 3, y: 6, z: 9, temp: getData[11], color: getColor[11].color, Number: 'L1-F1-A-1-12' });
    demoData.push({ x: 6, y: 6, z: 3, temp: getData[12], color: getColor[12].color, Number: 'L1-F1-A-1-13' });
    demoData.push({ x: 6, y: 6, z: 6, temp: getData[13], color: getColor[13].color, Number: 'L1-F1-A-1-14' });
    demoData.push({ x: 6, y: 6, z: 9, temp: getData[14], color: getColor[14].color, Number: 'L1-F1-A-1-15' });
    demoData.push({ x: 9, y: 6, z: 3, temp: getData[15], color: getColor[15].color, Number: 'L1-F1-A-1-16' });
    demoData.push({ x: 9, y: 6, z: 6, temp: getData[16], color: getColor[16].color, Number: 'L1-F1-A-1-17' });
    demoData.push({ x: 9, y: 6, z: 9, temp: getData[17], color: getColor[17].color, Number: 'L1-F1-A-1-18' });
    demoData.push({ x: 3, y: 9, z: 3, temp: getData[18], color: getColor[18].color, Number: 'L1-F1-A-1-19' });
    demoData.push({ x: 3, y: 9, z: 6, temp: getData[19], color: getColor[19].color, Number: 'L1-F1-A-1-20' });
    demoData.push({ x: 3, y: 9, z: 9, temp: getData[20], color: getColor[20].color, Number: 'L1-F1-A-1-21' });
    demoData.push({ x: 6, y: 9, z: 3, temp: getData[21], color: getColor[21].color, Number: 'L1-F1-A-1-23' });
    demoData.push({ x: 6, y: 9, z: 6, temp: getData[22], color: getColor[22].color, Number: 'L1-F1-A-1-24' });
    demoData.push({ x: 6, y: 9, z: 9, temp: getData[23], color: getColor[23].color, Number: 'L1-F1-A-1-25' });
    demoData.push({ x: 9, y: 9, z: 3, temp: getData[24], color: getColor[24].color, Number: 'L1-F1-A-1-26' });
    demoData.push({ x: 9, y: 9, z: 6, temp: getData[25], color: getColor[25].color, Number: 'L1-F1-A-1-27' });
    demoData.push({ x: 9, y: 9, z: 9, temp: getData[26], color: getColor[26].color, Number: 'L1-F1-A-1-28' });
    const data = [];
    demoData.forEach((item) => {
      const position = { x: 3 - item.x / 3, y: 3 - item.y / 3, z: 3 - item.z / 3, }
      if (!data[position.y]) {
        data[position.y] = [];
        data[position.y][position.x] = [];
      } else if (!data[position.y][position.x]) {
        data[position.y][position.x] = [];
      }
      data[position.y][position.x][position.z] = item;
    });
    this.demoData = data;
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
