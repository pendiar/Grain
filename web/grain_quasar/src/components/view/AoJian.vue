<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="row wrap gutter">
        <div class="grain-stats gt-md-width-1of2 auto" v-for="cang in LDList.Cang">
          <div class="card">
            <div class="item">
              <div class="item-content has-secondary">
                {{cang.Location}}
              </div>
              <span class="item-secondary" v-link="{name:'AoJian', params:$route.params, query:{PM:!$route.query.PM}}">
                <i>autorenew</i>
              </span>
            </div>
            <div class="list bordered inner-delimiter highlight">
              <div class="item">
                <div class="item-content">
                  <span class="item-label">
                    粮堆编号：
                  </span>
                  <span class="item-value">
                    {{cang.Number}}
                  </span>
                </div>
              </div>
              <div class="item">
                <div class="item-content">
                  <span class="item-label">
                    平均温度：
                  </span>
                  <span class="item-value">
                    {{cang.AverageTemperature}}°C
                  </span>
                </div>
              </div>
              <div class="item">
                <div class="item-content">
                  <span class="item-label">
                    平均湿度：
                  </span>
                  <span class="item-value">
                    {{cang.AverageHumidity}}%
                  </span>
                </div>
              </div>
              <chuanganpingmian :code="cang.Number" v-if="$route.query.PM"></chuanganpingmian>
              <chuangan3d :code="cang.Number" v-else></chuangan3d>
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
      LDList: {
        "ID": 1,
        "Number": "L1-F1-A",
        "Location": "L1楼1层A廒间",
        "F_Number": "L1-F1",
        "AverageTemperature": 23,
        "AverageHumidity": 22,
        "UserId": 0,
        "IsActive": 1,
        Cang: [
          {
            ID: 1,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 23,
            AverageHumidity: 22,
          },
          {
            ID: 2,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 23,
            AverageHumidity: 22,
          },
          {
            ID: 3,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 23,
            AverageHumidity: 22,
          },
          {
            ID: 4,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 23,
            AverageHumidity: 22,
          },
          {
            ID: 5,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 23,
            AverageHumidity: 22,
          },
          {
            ID: 6,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 23,
            AverageHumidity: 22,
          },
        ],
      },
    };
  },
};
</script>

<style>
</style>
