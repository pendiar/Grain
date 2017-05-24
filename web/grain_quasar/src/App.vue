<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" :class="{ isMobile: isMobile }">
    <router-view></router-view>
  </div>
</template>

<script>
import { Platform } from 'quasar';

/*
 * Root component
 */
export default {
  data() {
    return {
      isMobile: Platform.is.mobile,
    };
  },
};
</script>

<style></style>
