<template>
  <div class="grain-stats gt-md-width-1of2 auto">
    <div class="card">
      <div class="item">
        <div class="item-content has-secondary">
          {{cang.Location}}
        </div>
        <span class="item-secondary" @click="toggle">
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
        <chuanganpingmian :code="cang.Number" v-if="PM"></chuanganpingmian>
        <chuangan3d :code="cang.Number" v-else></chuangan3d>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['cang'],
  data() {
    return {
      PM: false,
    };
  },
  methods: {
    toggle() {
      this.PM = !this.PM;
    },
  },
};
</script>

<style>
  
</style>