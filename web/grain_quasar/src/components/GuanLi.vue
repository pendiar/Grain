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
        <!--<q-drawer-link icon="mail" :to="{ name: 'CGQGL' }">
          传感线管理
        </q-drawer-link>-->
        <template v-for="item in MenuList">
          <q-collapsible icon="inbox" :label="item.name" v-if="item.children.length">
            <q-drawer-link icon="mail" :to="getLink(link)" v-for="link in item.children" :key="link.id">
              {{link.name}}
            </q-drawer-link>
          </q-collapsible>
          <q-drawer-link icon="mail" :to="getLink(item)" v-else>
            {{item.name}}
          </q-drawer-link>
        </template>
        <!--<q-drawer-link icon="mail" :to="{name: item._linkurl,}" v-for="item in $bus.states.userInfo.MenuList" :key="item._id">
          {{item._name}}
        </q-drawer-link>-->
        <!--<q-drawer-link icon="mail" :to="{name: 'BuMen'}">
          组织管理
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{name: 'UserInfo'}">
          人员管理
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{name: 'Menu'}">
          菜单管理
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{name: 'Operation'}">
          操作管理
        </q-drawer-link>
        <q-drawer-link icon="mail" :to="{name: 'Role'}">
          角色管理
        </q-drawer-link>-->
      </div>
    </q-drawer>

    <keep-alive>
      <router-view class="layout-view" :key="$route.path"></router-view>
    </keep-alive>

    <!-- Footer
    <div slot="footer" class="toolbar"></div>
    -->
  </q-layout>
</template>

<script>
export default {
  computed: {
    MenuList() {
      const mapObj = {};
      if (!this.$bus.states.userInfo.MenuList) return [];
      const result = this.$bus.states.userInfo.MenuList.filter(item => !item._parentid).sort((a, b) => (a._sort - b._sort)).map((item, idx) => {
        mapObj[item._id] = idx;
        return { id: item._id, name: item._name, linkurl: item._linkurl, children: [] };
      });
      this.$bus.states.userInfo.MenuList.filter(item => item._parentid).sort((a, b) => (a._sort - b._sort)).forEach((item) => {
        if (item._parentid in mapObj) {
          result[mapObj[item._parentid]].children.push({ id: item._id, name: item._name, linkurl: item._linkurl });
        }
      });
      return result;
    },
  },
  data() {
    return {};
  },
  methods: {
    getLink(link) {
      const url = link.linkurl;
      if (!url) {
        return { path: '/error' };
      } else if (url.indexOf('http://') !== -1 || url.indexOf('https://') !== -1) {
        return { path: url };
      } else if (url.indexOf('/') !== -1) {
        return { path: url, query: { id: link.id } };
      }
      return { name: url, query: { id: link.id } };
    },
  },
}
</script>

<style>
</style>
