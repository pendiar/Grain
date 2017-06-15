<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="card">
        <!--<div class="card-title bg-primary text-white">
          {{Number}}
        </div>-->
        <p class="quote">
          传感器所属粮堆: {{$route.query.cangName || $route.query.cnumber}}
        </p>
        <!--<div class="card-content">-->
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
        <chuanganchart :type="xTabsModel"></chuanganchart>
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Number: '传感器L1-01f-00-01',
      xTabsModel:'0',
    };
  },
};
</script>

<style>
</style>
