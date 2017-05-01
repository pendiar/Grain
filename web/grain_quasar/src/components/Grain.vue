<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        粮仓监控
      </q-toolbar-title>
      <!-- opens drawer below -->
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
    </div>

    <!-- Navigation Tabs -->
    <!--<q-tabs slot="navigation">
      <q-tab icon="home" route="/Grain" exact replace>粮仓监控</q-tab>
      <q-tab icon="cloud" route="/GuanLi" exact replace>系统管理</q-tab>
    </q-tabs>-->

    <!-- Drawer
    <q-drawer ref="drawer">
      <div class="toolbar">
        <q-toolbar-title>
          导航
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="mail" :to="{path: '/jiankong',}">
          实时监控
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{path: '/Grain',}">
          粮仓信息
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{path: '/guanli',}">
          粮仓管理
        </q-drawer-link>
      </div>
    </q-drawer> -->

    <keep-alive>
      <router-view class="layout-view"></router-view>
    </keep-alive>

    <!-- Footer
    <div slot="footer" class="toolbar"></div>
    -->
  </q-layout>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
