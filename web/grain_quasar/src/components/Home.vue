<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        深圳粮食集团
      </q-toolbar-title>
    </div>
    
    <!-- Navigation Tabs -->
    <q-tabs slot="navigation">
      <q-tab icon="home" route="/Home/Register" exact replace>注册</q-tab>
      <q-tab icon="cloud" route="/Home/Login" exact replace>登录</q-tab>
    </q-tabs>

		<keep-alive>
      <router-view class="layout-view"></router-view>
    </keep-alive>

  </q-layout>
</template>

<script>
  export default {
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

<style lang="less" scoped>

</style>
