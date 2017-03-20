// Import Vue
import Vue from 'vue'

// Import ty Style
import './css/ty.css'

// Import F7
import Framework7 from 'framework7'

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue'

// Import F7 iOS Theme Styles
import Framework7Theme from 'framework7/dist/css/framework7.ios.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.ios.colors.min.css'
/* OR for Material Theme:
import Framework7Theme from 'framework7/dist/css/framework7.material.min.css'
import Framework7ThemeColors from 'framework7/dist/css/framework7.material.colors.min.css'
*/

// 导入heightcharts
import Highcharts from 'highcharts';

// Import App Custom Styles
import AppStyles from './css/app.css'

// Import Routes
import Routes from './routes.js'

// Import App Component
import App from './app'

// Init F7 Vue Plugin
Vue.use(Framework7Vue);

// 加载模块
require('highcharts/modules/heatmap')(Highcharts);

// 注入组件
Vue.prototype.Highcharts = Highcharts;
Vue.prototype.$serverApi = '/api';
Vue.prototype.$bus = new Vue({
  data() {
    return {
      status: {},
    };
  },
  methods: {
    setStatus(name, value) {
      if (this.status[name] === undefined) {
        this.$set(this.status, name, value);
      } else {
        this.status[name] = value;
      }
    }
  }
});

// Init App
new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    root: '#app',
    /* Uncomment to enable Material theme: */
    // material: true,
    routes: Routes,
    pushState: true,
    swipePanel: 'left',
    dynamicNavbar: true,
  },
  // Register App Component
  components: {
    app: App
  }
});
