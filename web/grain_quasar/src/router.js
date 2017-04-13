import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function load(component) {
  return () => System.import(`components/${component}.vue`);
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', redirect: { name: 'GrainList' } },
    { path: '/Grain', // 粮仓管理
      component: load('Grain'),
      children: [
        { path: '', redirect: { name: 'GrainList' } },
        { path: 'GrainList',
          name: 'GrainList',
          component: load('view/GrainList'),
          children: [
            { path: 'AoJianList/:id',
              name: 'AoJianList',
              component: load('GrainList/AoJianList'),
              children: [
                { path: 'DuiWei/:id', name: 'DuiWei', component: load('GrainList/DuiWei') },
              ],
            },
          ],
        },
        { path: 'DuiWeiMo', name: 'DuiWeiMo', component: load('view/DuiWeiMo') },
        { path: 'AoJian/:id', name: 'AoJian', component: load('view/AoJian') },
        { path: 'ChuanGan/:id', name: 'ChuanGan', component: load('view/ChuanGan') },
        { path: 'LiangCang/:id', name: 'LiangCang', component: load('view/LiangCang') },
      ],
    },
    { path: '/layout', component: load('layout/Hello') }, // Not found
    { path: '/view', component: load('view/Hello') }, // Not found
    { path: '*', component: load('Error404') }, // Not found
  ],
});
