<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="row wrap gutter">
        <cang-card v-for="cang in LDList.Cang" :key="cang.ID" :cang="cang"></cang-card>
      </div>
    </div>
  </div>
</template>

<script>
import CangCard from 'components/AoJian/CangCard';

export default {
  components: {
    CangCard,
  },
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
            AverageTemperature: 30,
            AverageHumidity: 22,
          },
          {
            ID: 3,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 36,
            AverageHumidity: 22,
          },
          {
            ID: 4,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 40,
            AverageHumidity: 22,
          },
          {
            ID: 5,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 46,
            AverageHumidity: 22,
          },
          {
            ID: 6,
            Number: 'L1-F1-A-1',
            Location: 'L1楼1层A廒间粮堆1',
            AverageTemperature: 50,
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
