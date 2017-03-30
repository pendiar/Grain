<template>
  <!-- root node required -->
  <div>
    <!-- your content -->
    <div class="layout-padding">
      <!-- if you want automatic padding -->
      <div class="row wrap gutter">
        <chart></chart>
      </div>
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
			
    };
  },
};
</script>

<style>
</style>
