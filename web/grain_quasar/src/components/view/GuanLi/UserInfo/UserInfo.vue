<template>
  <div class="UserInfo">
    <div class="layout-padding">
      <!--<transition-group name="list-complete" tag="tr">-->
      <p class="group">
        <button class="primary" @click="addUserInfo"><i>add</i> 添加用户</button>
        <button class="primary" @click="editGrain"><i>edit</i> 编辑粮仓关系</button>
      </p>
      <q-data-table
        :data="table"
        :config="config"
        :columns="columns"
        @refresh="refresh"
      >
        <template slot="col-handle" scope="cell">
          <button class="primary clear" @click="editUserInfo(cell)">
            <i>edit</i>
          </button>
          <button class="primary clear" @click="deleteUserInfo(cell)">
            <i>delete</i>
          </button>
          <!--<button class="primary clear" @click="addChildUserInfo(cell)">
            <i>add</i>
          </button>-->
        </template>

        <template slot="selection" scope="props">
          <button class="primary clear" @click="deleteUserInfos(props)">
            <i>delete</i>
          </button>
        </template>
      </q-data-table>
      <!--</transition-group>-->
    </div>
    <q-modal ref="edit" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <edit-UserInfo ref="EditUserInfo" @hide="closeModal"></edit-UserInfo>
    </q-modal>
    <q-modal ref="add" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <add-UserInfo ref="AddUserInfo" @hide="closeModal"></add-UserInfo>
    </q-modal>
    <q-modal ref="editGrain" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <edit-Grain ref="EditGrain" @hide="closeModal"></edit-Grain>
    </q-modal>
  </div>
</template>

<script>
  import { Platform, Utils, Toast, Dialog } from 'quasar';
  import EditUserInfo from './EditUserInfo.vue';
  import AddUserInfo from './AddUserInfo.vue';
  import EditGrain from './EditGrain.vue';

  export default {
    components: {
      EditUserInfo,
      AddUserInfo,
      EditGrain,
    },
    data() {
      return {
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
        this.fetchData();
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
    },
  };
</script>

<style lang="less" scoped>

</style>
