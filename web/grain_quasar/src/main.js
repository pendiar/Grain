// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`);
// ==============================

import Vue from 'vue'
import Quasar from 'quasar';
import router from './router';
import resource from 'vue-resource';

import storage from './lib/storage';
import store from './config/store';
import 'assets/css/common.css';

// 公共组件
import chuangan3d from 'components/common/chuangan3d';
import chuanganpingmian from 'components/common/chuanganpingmian';
import chuanganchart from 'components/common/chuanganchart';
import chuanganline from 'components/common/chuanganLine';

Vue.use(Quasar); // Install Quasar Framework
Vue.use(resource);
Vue.component('chuangan3d', chuangan3d);
Vue.component('chuanganpingmian', chuanganpingmian);
Vue.component('chuanganchart', chuanganchart);
Vue.component('chuanganline', chuanganline);

const bus = new Vue(store);
Vue.prototype.$bus = bus;
Vue.prototype.$storage = storage;

Vue.mixin({
  data() {
    return {
      serverAddress: '/api',
    };
  },
});

router.beforeEach((to, from, next) => {
  if (!bus.states.userInfo && to.path.indexOf('/Account') !== 0) {
    let loginInfo = storage('loginInfo');
    if (loginInfo) {
      try {
        loginInfo = JSON.parse(loginInfo);
        const nowDate = new Date().getTime();
        // alert(nowDate - loginInfo.date)
        if ((nowDate - loginInfo.date) < 3600000) {
          loginInfo.date = nowDate;
          storage('loginInfo', JSON.stringify(loginInfo));
          bus.setStates('userInfo', loginInfo.rows);
          next();
          return;
        }
      } catch (e) {
        // alert(e);
      }
    }
    next({ name: 'Login' });
  } else {
    next();
  }
});

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  });
});
