<template>
  <div class="UserInfo">
    <!--<div class="layout-padding">-->
      <!--<transition-group name="list-complete" tag="tr">-->
      <p class="group">
        <button class="primary" @click="addUserInfo" v-if="rights.indexOf('flexiCreate')!==-1"><i>add</i> 添加用户</button>
        <!--<button class="primary" @click="editGrain" v-if="rights.indexOf('grainModify')!==-1"><i>edit</i> 编辑粮仓关系</button>-->
      </p>
      <q-data-table
        :data="table"
        :config="config"
        :columns="columns"
        @refresh="refresh"
      >
        <template slot="col-handle" scope="cell">
          <button class="primary clear" @click="editUserInfo(cell)" v-if="rights.indexOf('flexiModify')!==-1">
            <i>edit</i>
          </button>
          <button class="primary clear" @click="deleteUserInfo(cell)" v-if="rights.indexOf('flexiDelete')!==-1">
            <i>delete</i>
          </button>
          <button class="primary clear" @click="editUserGrain(cell)" v-if="rights.indexOf('grainModify')!==-1">
            <i>home</i>
          </button>
        </template>

        <template slot="selection" scope="props">
          <button class="primary clear" @click="deleteUserInfos(props)" v-if="rights.indexOf('flexiDelete')!==-1">
            <i>delete</i>
          </button>
        </template>
      </q-data-table>
      <!--</transition-group>-->
    <!--</div>-->
    <q-modal ref="edit" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <edit-UserInfo ref="EditUserInfo" @hide="closeModal"></edit-UserInfo>
    </q-modal>
    <q-modal ref="add" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <add-UserInfo ref="AddUserInfo" @hide="closeModal"></add-UserInfo>
    </q-modal>
    <q-modal ref="editGrain" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <edit-Grain ref="EditGrain" @hide="closeModal"></edit-Grain>
    </q-modal>
    <q-modal ref="editUserGrain" :content-css="{minWidth: '80vw', minHeight: '80vh', paddingBottom: '50px', position: 'relative'}">
      <edit-user-grain ref="EditUserGrain" @hide="closeModal" :userid="editUserGrainInfo.userid" :departmentid="editUserGrainInfo.departmentid"></edit-user-grain>
    </q-modal>
  </div>
</template>

<script>
  import { Platform, Utils, Toast, Dialog } from 'quasar';
  import EditUserInfo from './EditUserInfo.vue';
  import AddUserInfo from './AddUserInfo.vue';
  import EditGrain from './EditGrain.vue';
  import EditUserGrain from './EditUserGrain.vue';

  export default {
    components: {
      EditUserInfo,
      AddUserInfo,
      EditGrain,
      EditUserGrain,
    },
    data() {
      return {
        rights: [],
        editUserGrainInfo: {
          departmentid: '',
          userid: '',
        },
        editData: {},
        table: [],
        config: {
          title: '人员管理',
          refresh: true,
          columnPicker: true,
          // leftStickyColumns: 1,
          // rightStickyColumns: 2,
          bodyStyle: {
            maxHeight: Platform.is.mobile ? '50vh' : '500px'
          },
          rowHeight: '50px',
          responsive: true,
          pagination: {
            rowsPerPage: 15,
            options: [5, 10, 15, 30, 50, 500]
          },
          selection: 'multiple',
          messages: {
            noData: '<i>warning</i> 暂无数据！',
            noDataAfterFiltering: '<i>warning</i> 无匹配数据，请检查筛选项！'
          }
        },
        columns: [
          {
            label: '用户名',
            field: '_loginid',
            width: '100px',
            filter: true,
            // sort: true,
          },
          {
            label: '真实名',
            field: '_nickname',
            width: '80px',
            filter: true,
            // sort: true,
          },
          {
            label: '角色',
            field: '_rolename',
            width: '100px'
          },
          {
            label: '所在组织',
            field: '_departmentname',
            // sort: true,
            width: '100px'
          },
          {
            label: '性别',
            field: '_sex',
            // sort: true,
            filter: true,
            width: '50px'
          },
          // {
          //   label: '手机号',
          //   field: '_phonenumber',
          //   // sort: true,
          //   filter: true,
          //   width: '90px'
          // },
          // {
          //   label: '邮箱地址',
          //   field: '_emailaddress',
          //   // sort: true,
          //   width: '100px'
          // },
          // {
          //   label: '住址',
          //   field: '_address',
          //   // sort: true,
          //   // width: '120px'
          // },
          {
            label: '是否开启',
            field: '_state',
            // sort: true,
            width: '80px',
            // format(value) {
            //   return value ? '是' : '否';
            // },
          },
          {
            label: '操作',
            field: 'handle',
            width: '120px',
          },
        ],
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      closeModal() {
        this.$refs.edit.close();
        this.$refs.add.close();
        this.$refs.editGrain.close();
        this.$refs.editUserGrain.close();
        this.fetchData();
      },
      editUserGrain(cell) {
        this.editUserGrainInfo.userid = cell.row._id;
        this.editUserGrainInfo.departmentid = cell.row._departmentid;
        this.$refs.editUserGrain.open();
        // this.$http.get(`${this.serverAddress}/UserGranaryRights/GetUserGranaryListByUid/${this.$bus.states.userInfo.Id}`).then((response) => {
        //   console.log(response);
        //   this.
        // }, () => {
        // });
      },
      editGrain() {
        this.$refs.EditGrain.setDepartment();
        this.$refs.editGrain.open();
      },
      editUserInfo(cell) {
        Object.keys(this.$refs.EditUserInfo.tableData).forEach((key) => {
          this.$refs.EditUserInfo.tableData[key] = cell.row[key];
        });
        this.$refs.EditUserInfo.oldPassword = cell.row._password;
        this.$refs.EditUserInfo.surePassword = cell.row._password;
        this.$refs.edit.open();
      },
      deleteUserInfo(cell) {
        const vm = this;
        Dialog.create({
          title: '删除菜单',
          message: '确认删除菜单？',
          buttons: [
            '否',
            {
              label: '是',
              handler() {
                vm.$http.post(`${vm.serverAddress}/UserInfo/Delete`, [{ _id: cell.row._id }]).then((response) => {
                  if (response.data.Code === 1000) {
                    vm.closeModal();
                    Toast.create.positive('删除成功！');
                  } else {
                    Toast.create.warning('删除失败！');
                  }
                }, (error) => {
                  Toast.create.warning('删除失败！');
                });
              },
            },
          ],
        });
      },
      deleteUserInfos(props) {
        const vm = this;
        Dialog.create({
          title: '删除菜单',
          message: '确认删除菜单？',
          buttons: [
            '否',
            {
              label: '是',
              handler() {
                vm.$http.post(`${vm.serverAddress}/UserInfo/Delete`, props.rows.map(cell => ({ _id: cell.data._id }))).then((response) => {
                  if (response.data.Code === 1000) {
                    vm.closeModal();
                    Toast.create.positive('删除成功！');
                  } else {
                    Toast.create.warning('删除失败！');
                  }
                }).catch((e) => {
                  console.error(e)
                  Toast.create.warning('删除失败！');
                });
              },
            },
          ],
        });
      },
      addChildUserInfo(cell) {
        this.$refs.AddUserInfo.tableData._parentid = cell.row._id;
        this.$refs.add.open();
      },
      addUserInfo(props) {
        // this.$refs.AddUserInfo.tableData._parentid = null;
        this.$refs.add.open();
      },
      fetchData(done) {
        this.$http.post(`${this.serverAddress}/UserInfo/GetData`, [
          "PageIndex^1",
          "PageCount^1000",
          "Sort^Name",
          "OrderType^desc",
          "StartDate^2016-11-11",
          "EndDate^2017-12-11",
        ]).then((response) => {
          // alert(JSON.stringify(response.data.DataValue))
          if (response.data.Code === 1000) {
            const obj = {};
            this.table = response.data.DataValue.rows;
          }
          if (done instanceof Function) done();
        }, (error) => {
          if (done instanceof Function) done();
        });
      },
      refresh (done) {
        this.fetchData(done);
      },
      setRights() {
        this.$http.get(`${this.serverAddress}/Operation/GetToolbar/${"59A2CB76-B6C8-4EDB-9447-E94FF6AC5942"}/${this.$bus.states.userInfo.Id}`).then((response) => {
          if (response.data.Code === 1000) {
            this.rights = response.data.DataValue.rows.map(item => item._function);
            // {"Code":1000,"Msg":"成功","DataValue":{"total":3,"rows":[{"_id":"9f5bbf3b-2d80-46a7-a50d-ec3440b1529b","_name":"创建","_function":"flexiCreate","_iconic":"icon-add","_sort":222,"_remark":null,"_state":"1","_isshow":0,"<SysMenuId>k__BackingField":null,"<SysMenuIdOld>k__BackingField":null},{"_id":"5d05d43d-bb5b-47ef-b60a-2252c90fa7b2","_name":"删除","_function":"flexiDelete","_iconic":"icon-remove","_sort":333,"_remark":null,"_state":"1","_isshow":0,"<SysMenuId>k__BackingField":null,"<SysMenuIdOld>k__BackingField":null},{"_id":"e48acd7e-6cb8-4271-b601-c362ea432d84","_name":"修改","_function":"flexiModify","_iconic":"icon-edit","_sort":444,"_remark":null,"_state":"1","_isshow":0,"<SysMenuId>k__BackingField":null,"<SysMenuIdOld>k__BackingField":null}]},"TextValue":""}
          } else {
            this.rights = [];
          }
          // {"Code":1012,"Msg":"未找到数据","DataValue":null,"TextValue":""}
        }, () => {
          this.rights = [];
        });
      },
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.setRights();
      });
    },
  };
</script>

<style lang="less" scoped>

</style>
