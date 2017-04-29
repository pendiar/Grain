// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'
import resource from 'vue-resource'

import store from './config/store'
import 'assets/css/common.css'

// 公共组件
import chuangan3d from 'components/common/chuangan3d'
import chuanganpingmian from 'components/common/chuanganpingmian'
import chuanganchart from 'components/common/chuanganchart'
import chuanganline from 'components/common/chuanganLine'

Vue.use(Quasar) // Install Quasar Framework
Vue.use(resource) 
Vue.component('chuangan3d', chuangan3d) 
Vue.component('chuanganpingmian', chuanganpingmian) 
Vue.component('chuanganchart', chuanganchart) 
Vue.component('chuanganline', chuanganline) 

Vue.mixin({
  data() {
    return {
      serverAddress:'/api',
    }
  }
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
