<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" :class="{ isMobile: Platform.is.mobile }">
    <router-view></router-view>
  </div>
</template>

<script>
import { Platform } from 'quasar';

/*
 * Root component
 */
export default {}
</script>

<style></style>
