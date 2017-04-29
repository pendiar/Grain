<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <!-- opens drawer below -->
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
      <q-toolbar-title :padding="1">
        系统管理
      </q-toolbar-title>
    </div>

    <!-- Navigation Tabs -->
    <q-tabs slot="navigation">
      <q-tab icon="home" route="/Grain" exact replace>粮仓监控</q-tab>
      <q-tab icon="cloud" route="/GuanLi" exact replace>系统管理</q-tab>
    </q-tabs>

    <!-- Drawer -->
    <q-drawer ref="drawer">
      <div class="toolbar">
        <q-toolbar-title>
          导航菜单
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="mail" :to="{path: '/jiankong',}">
          部门管理
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{path: '/Grdfsain',}">
          人员管理
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{path: '/GuagsdnLi',}">
          菜单管理
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{path: '/Grgdsain',}">
          操作管理
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{path: '/GuagasdnLi',}">
          角色管理
        </q-drawer-link>
      </div>
    </q-drawer>

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
