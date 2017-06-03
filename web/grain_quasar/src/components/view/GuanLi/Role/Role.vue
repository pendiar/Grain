<template>
  <div class="Role">
    <div class="layout-padding">
      <!--<transition-group name="list-complete" tag="tr">-->
      <p class="group">
        <button class="primary" @click="addRole" v-if="1||rights.indexOf('flexiCreate')!==-1">
          <i>add</i> 添加角色
        </button>
      </p>
      <q-data-table
        :data="table"
        :config="config"
        :columns="columns"
        @refresh="refresh"
      >
        <template slot="col-handle" scope="cell">
          <button class="primary clear handle" @click="editRole(cell)" v-if="1||rights.indexOf('flexiModify')!==-1">
            <i>edit</i>
          </button>
          <button class="primary clear handle" @click="deleteRole(cell)" v-if="1||rights.indexOf('flexiDelete')!==-1">
            <i>delete</i>
          </button>
          <button class="primary clear handle" @click="editPermission(cell)" v-if="1||rights.indexOf('flexiModify')!==-1">
            <i>account_circle</i>
          </button>
        </template>

        <template slot="selection" scope="props">
          <button class="primary clear" @click="deleteRoles(props)" v-if="1||rights.indexOf('flexiDelete')!==-1">
            <i>delete</i>
          </button>
        </template>
      </q-data-table>
      <!--</transition-group>-->
    </div>
    <q-modal ref="edit" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <edit-role ref="EditRole" @hide="closeModal"></edit-role>
    </q-modal>
    <q-modal ref="add" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <add-role ref="AddRole" @hide="closeModal"></add-role>
    </q-modal>
  </div>
</template>

<script>
  import { Platform, Utils, Toast, Dialog } from 'quasar';
  import EditRole from './EditRole.vue';
  import AddRole from './AddRole.vue';

  export default {
    components: {
      EditRole,
      AddRole,
    },
    data() {
      return {
        rights: [],
        editData: {},
        table: [],
        config: {
          title: '角色管理',
          refresh: true,
          // columnPicker: true,
          // leftStickyColumns: 1,
          // rightStickyColumns: 2,
          bodyStyle: {
            maxHeight: Platform.is.mobile ? '50vh' : '500px'
          },
          rowHeight: '50px',
          // responsive: true,
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
            label: '角色',
            field: '_name',
            width: '120px',
            // filter: true,
            // sort: true,
          },
          {
            label: '排序',
            field: '_sort',
            // sort: true,
            // filter: true,
            width: '80px'
          },
          {
            label: '备注',
            field: '_description',
            // sort: true,
            // width: '120px'
          },
          // {
          //   label: '是否可见',
          //   field: '_isshow',
          //   // sort: true,
          //   width: '120px',
          //   format(value) {
          //     return value ? '是' : '否';
          //   },
          // },
          {
            label: '操作',
            field: 'handle',
            width: '180px',
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
      editRole(cell) {
        Object.keys(this.$refs.EditRole.tableData).forEach((key) => {
          this.$refs.EditRole.tableData[key] = cell.row[key];
        });
        this.$refs.edit.open();
      },
      deleteRole(cell) {
        const vm = this;
        Dialog.create({
          title: '删除角色',
          message: '确认删除角色？',
          buttons: [
            '否',
            {
              label: '是',
              handler() {
                vm.$http.post(`${vm.serverAddress}/Role/Delete`, [{ _id: cell.row._id }]).then((response) => {
                  if (response.data.Code === 1000) {
                    vm.closeModal();
                    Toast.create.positive('删除成功！');
                  } else {
                    Toast.create.warning('删除失败！');
                  }
                }).catch((e) => {
                  Toast.create.warning('删除失败！');
                });
              },
            },
          ],
        });
      },
      deleteRoles(props) {
        const vm = this;
        Dialog.create({
          title: '删除角色',
          message: '确认删除角色？',
          buttons: [
            '否',
            {
              label: '是',
              handler() {
                vm.$http.post(`${vm.serverAddress}/Role/Delete`, props.rows.map(cell => ({ _id: cell.data._id }))).then((response) => {
                  if (response.data.Code === 1000) {
                    vm.closeModal();
                    Toast.create.positive('删除成功！');
                  } else {
                    Toast.create.warning('删除失败！');
                  }
                }).catch((e) => {
                  Toast.create.warning('删除失败！');
                });
              },
            },
          ],
        });
      },
      editPermission(cell) {
        this.$router.push({ name: 'EditPermission', params: { id: cell.row._id } });
      },
      addRole(props) {
        this.$refs.AddRole.tableData._parentid = '00000000-000-000-000';
        this.$refs.add.open();
      },
      fetchData(done) {
        this.$http.post(`${this.serverAddress}/Role/GetData`, [
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
            const result = [];
            const data = response.data.DataValue.rows;
            function addRows(arr,id) {
              obj[id]._childid.forEach((cid) => {
                const objRow = obj[cid];
                const row = data[objRow.index];
                arr.push(row);
                addRows(arr,cid);
              });
            }
            response.data.DataValue.rows.forEach((row, index) => {
              if (!row._parentid || row._parentid.indexOf('00000000') === 0) result.push(row);
              if (row._parentid in obj) {
                obj[row._parentid]._childid.push(row._id);
              } else {
                obj[row._parentid] = { _childid: [row._id] };
              }
              if (row._id in obj) {
                obj[row._id]._parentid = row._parentid;
              } else {
                obj[row._id] = { _childid: [], _parentid: row._parentid, index };
              }
            });
            if (result.length) addRows(result, result[0]._id);
            this.table = result;
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
        if (!this.$bus.states.userInfo.RoleIdList || !this.$bus.states.userInfo.RoleIdList[0]) {
          this.rights = [];
          return;
        }
        this.$http.get(`${this.serverAddress}/Operation/GetToolbar/${this.$route.query.id || "3e973405-7fa4-4676-b3f1-6529b27b8406"}/${this.$bus.states.userInfo.RoleIdList[0]._id || 'null'}`).then((response) => {
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
