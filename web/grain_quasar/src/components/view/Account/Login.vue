<template>
  <div class="login">
    <div class="layout-padding">
      <!--<div class="row">
        <div class="width-2of3">-->
          <div class="card">
            <div class="card-title">
              使用本地账户登录
            </div>
            <div class="list bordered inner-delimiter highlight">
            <!--<div class="card-content">-->
              <div class="item multiple-lines">
                <div class="item-content row items-center wrap">
                  <div style="margin-right: 10px;" class="item-label">用户名:</div>
                  <input class="auto" v-model="LoginName" placeholder="请输入用户名">
                </div>
              </div>
              <div class="item multiple-lines">
                <div class="item-content row items-center wrap">
                  <div style="margin-right: 10px;" class="item-label">密&nbsp;&nbsp;码:</div>
                  <input class="auto" v-model="Password" type="password" placeholder="请输入密码">
                </div>
              </div>
            </div>
            <div class="card-actions">
              <!--<div class="text-lime">
                13 minutes
              </div>
              <div>
                (1 mile)
              </div>
              <div class="auto"></div>-->
              <button class="primary small" @click="login"><i class="on-left">directions</i> 登陆</button>
            </div>
          </div>
        <!--</div>
      </div>-->
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import storage from 'components/../lib/storage';
  import { Platform, Toast } from 'quasar';
  
  const getGranaryList = function (fn) {
    // console.log(Vue.prototype.$bus.states.userInfo)
    Vue.http.get(`${Vue.prototype.serverAddress}/UserGranaryRights/GetUserGranaryListByUid/${Vue.prototype.$bus.states.userInfo.Id}`).then((response) => {
      Vue.prototype.$bus.setStates('UserGranaryList', response.data.DataValue.rows.map(item => item.GranaryNumber));
      fn();
    }, () => {
      fn();
    });
  }

  export default {
    data() {
      return {
        LoginName: '',
        Password: '',
      };
    },
    methods: {
      login() {
        if (!this.LoginName) {
          Toast.create.warning('请输入用户名!');
          return;
        } else if (!this.Password) {
          Toast.create.warning('请输入密码!');
          return;
        }
        this.$http.post(`${this.serverAddress}/Account/LogIn`, { LoginName: this.LoginName, Password: this.Password,ValidateCode: 666666 }).then((response) => {
          if (response.data.Code === 1000) {
            this.$bus.setStates('userInfo', response.data.DataValue.rows);
            this.$storage('loginInfo', JSON.stringify({ date: new Date().getTime(), rows: response.data.DataValue.rows }));
            Toast.create.positive('登录成功！');
            this.getGranaryList(() => { this.$router.push({ name: 'GrainList' }); });
          } else {
            Toast.create.warning('用户名或密码错误!');
          }
        }, () => {
          Toast.create.warning('连接错误，请检查网络!');
        });
      },
      getGranaryList,
    },
    beforeRouteEnter(to, from, next) {
      if (Platform.is.desktop) {
        next();
        return;
      }
      const search = window.location.search;
      let ID = storage('loginInfo');
      if (ID) ID = JSON.parse(ID).rows.Id;
      if (search && search.indexOf('ID=') !== -1) {
        ID = search.split('ID=')[1].split('&')[0];
        Vue.prototype.$bus.setStates('userInfo', { Id: ID });
        getGranaryList(checkID);
      } else {
        checkID();
      }
      function checkID () {
        if (ID) {
          next({ name: to.query.name || 'GrainList' })  ;
          storage('loginInfo', JSON.stringify({ date: new Date().getTime(), rows: { Id: ID } }));
        } else {
          Toast.create.warning('无法获取用户ID');
        }
      }
    },
    // created() {
    //   this.$http.post(`${this.serverAddress}/Account/LogIn`, { LoginName: 'admin666', Password: '1234567' }).then((response) => {
    //     if (response.data.Code === 1000) {
    //       // {"Code":1000,"Msg":"成功","DataValue":{"total":-1,"rows":{"Id":"f5212f67-59ea-4d64-86c9-13ae48a3154f","LoginID":"admin666","UserName":"administator","MenuList":[{"_id":"59A2CB76-B6C8-4EDB-9447-E94FF6AC5942","_name":"人员管理","_parentid":"A09A5BC4-8D93-401D-AA48-8B6D938971C9","_isleaf":null,"_linkurl":"UserInfo","_sort":null,"_state":"1","_iconic":null,"_remark":"10001001","_isshow":0,"_code":"10001001","_parentidold":null,"_sysoperationid":null,"_sysoperationidold":null},{"_id":"7559A394-1390-4574-8DBC-51E8A8839BBF","_name":"修改密码","_parentid":"9A8B9815-6613-49D9-9E15-81DEB114A90A","_isleaf":null,"_linkurl":null,"_sort":null,"_state":"1","_iconic":null,"_remark":"10001004","_isshow":0,"_code":"10011000","_parentidold":null,"_sysoperationid":null,"_sysoperationidold":null},{"_id":"9A8B9815-6613-49D9-9E15-81DEB114A90A","_name":"个人设置","_parentid":null,"_isleaf":null,"_linkurl":null,"_sort":null,"_state":"1","_iconic":null,"_remark":"1001","_isshow":0,"_code":"1001","_parentidold":null,"_sysoperationid":null,"_sysoperationidold":null},{"_id":"A09A5BC4-8D93-401D-AA48-8B6D938971C9","_name":"系统设置","_parentid":null,"_isleaf":null,"_linkurl":null,"_sort":null,"_state":"1","_iconic":null,"_remark":"1000","_isshow":0,"_code":"1000","_parentidold":null,"_sysoperationid":null,"_sysoperationidold":null},{"_id":"D773DFEE-FBF5-4C17-ADD6-587A9A3203E2","_name":"基本信息","_parentid":null,"_isleaf":null,"_linkurl":null,"_sort":null,"_state":"1","_iconic":null,"_remark":"1002","_isshow":0,"_code":"1002","_parentidold":null,"_sysoperationid":null,"_sysoperationidold":null}],"RoleIdList":[{"_id":"3ad85573-23a6-4669-9c30-8aef555be0fb","_name":"管理员","_state":1,"_sort":12,"_description":null,"_updatetime":null,"_isshow":0}]}},"TextValue":""}
    //     }
    //     // {"Code":1011,"Msg":"账号或密码不正确","DataValue":null,"TextValue":""}
    //   });
    //   this.$http.get(`${this.serverAddress}/Operation/GetToolbar/${'59A2CB76-B6C8-4EDB-9447-E94FF6AC5942'}/${'8FB91D77-5BF3-411D-A562-2021CDE15857'}`).then((response) => {
    //     if (response.data.Code === 1000) {
    //       // {"Code":1000,"Msg":"成功","DataValue":{"total":3,"rows":[{"_id":"9f5bbf3b-2d80-46a7-a50d-ec3440b1529b","_name":"创建","_function":"flexiCreate","_iconic":"icon-add","_sort":222,"_remark":null,"_state":"1","_isshow":0,"<SysMenuId>k__BackingField":null,"<SysMenuIdOld>k__BackingField":null},{"_id":"5d05d43d-bb5b-47ef-b60a-2252c90fa7b2","_name":"删除","_function":"flexiDelete","_iconic":"icon-remove","_sort":333,"_remark":null,"_state":"1","_isshow":0,"<SysMenuId>k__BackingField":null,"<SysMenuIdOld>k__BackingField":null},{"_id":"e48acd7e-6cb8-4271-b601-c362ea432d84","_name":"修改","_function":"flexiModify","_iconic":"icon-edit","_sort":444,"_remark":null,"_state":"1","_isshow":0,"<SysMenuId>k__BackingField":null,"<SysMenuIdOld>k__BackingField":null}]},"TextValue":""}
    //     }
    //     // {"Code":1012,"Msg":"未找到数据","DataValue":null,"TextValue":""}
    //   });
    // },
  };
</script>
