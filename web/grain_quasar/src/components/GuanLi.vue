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
      <button class="primary">
        <i>menu</i>
        <q-popover ref="popover">
          <!--
            The DOM element(s) that make up the Dropdown menu,
            in this case a list
          -->
          <div class="list item-delimiter highlight" @click="$refs.popover.close()">
            <div class="item item-link" @click.stop="logout">
              <div class="item-content">
                退出账户
              </div>
            </div>
          </div>
        </q-popover>
      </button>
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
          <q-collapsible :icon="item.iconic || 'inbox'" :label="item.name" v-if="item.children.length">
            <q-drawer-link :icon="link.iconic || 'mail'" :to="getLink(link)" v-for="link in item.children" :key="link.id">
              {{link.name}}
            </q-drawer-link>
          </q-collapsible>
          <q-drawer-link :icon="item.iconic || 'mail'" :to="getLink(item)" v-else>
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
            // const obj = {};
            // const result = [];
            // const data = this.$bus.states.userInfo.MenuList;
            // function addRows(arr,code) {
            //   obj[code].children.forEach((cCode) => {
            //     const objRow = obj[cCode];
            //     const row = data[objRow.index];
            //     arr.push(row);
            //     addRows(arr,cCode);
            //   });
            // }
            // response.data.DataValue.rows.forEach((row, index) => {
            //   // if (!row._parentid || row._parentid.indexOf('00000000') === 0) result.push(row);
            //   const code = row._code.length > 7 ? row._code.slice(0, -4) : '';
            //   if (code in obj) {
            //     obj[code].children.push(row._code);
            //   } else if (code) {
            //     obj[code] = { children: [row._code] };
            //   } else {
            //     result.push(row);
            //   }
            //   if (row._code in obj) {
            //     if (code) obj[row._code].parent = code;
            //     obj[row._code].index = index;
            //   } else {
            //     obj[row._code] = code ? { children: [], parent: code, index } : { children: [], index };
            //   }
            // });
            // // console.log(obj)
            // if (obj[null]) addRows(result, null);
            // this.table = result;
      const mapObj = {};
      if (!this.$bus.states.userInfo.MenuList) return [];
      const result = this.$bus.states.userInfo.MenuList.filter(item => item._code.length < 5).sort((a, b) => (a._sort - b._sort)).map((item, idx) => {
        mapObj[item._code] = idx;
        return { id: item._id, name: item._name, linkurl: item._linkurl, iconic: item._iconic, children: [] };
      });
      this.$bus.states.userInfo.MenuList.filter(item => item._code.length > 4).sort((a, b) => (a._sort - b._sort)).forEach((item) => {
        const pCode = item._code.slice(0, 4);
        if (pCode in mapObj) {
          result[mapObj[pCode]].children.push({ id: item._id, name: item._name, iconic: item._iconic, linkurl: item._linkurl });
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
    logout() {
      this.$refs.popover.close();
      this.$bus.setStates('UserGranaryList', null);
      this.$storage('UserGranaryList', 'remove');
      this.$bus.setStates('userInfo', null);
      this.$storage('loginInfo', 'remove');
      this.$router.replace({ name: 'Login', query: { name: this.$route.name } })
    },
  },
}
</script>

<style>
</style>
