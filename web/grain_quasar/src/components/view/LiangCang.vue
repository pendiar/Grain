<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <p class="quote">
        {{$route.query.name || $route.params.id}} 粮堆三温图
      </p>
      <q-tabs
          v-model="xTabsModel"
          class="justified"
      > 
          <q-tab
              name="0"
          >最近24小时</q-tab>
          <!--<q-tab
              name="1"
          >最近七天</q-tab>-->
          <q-tab
              name="2"
          >最近一个月</q-tab>
          <q-tab
              name="3"
          >最近一年</q-tab>
      </q-tabs>
      <chart :type="xTabsModel"></chart>
    </div>
  </div>
</template>

<script>
import chart from 'components/common/liangcangchart';

export default {
  components: {
    chart,
  },
  data() {
    return {
      xTabsModel: '0',
    };
  },
};
</script>

<style>
</style>
