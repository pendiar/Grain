<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="card" v-for="cang in AoJianData.Cang">
        <div class="card-title">
          {{cang.Location}}
        </div>
        <div class="card-content">
          Card Content
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      AoJianData: {
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
        ],
      },
    };
  },
};
</script>

<style>
</style>
