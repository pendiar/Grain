<template>
  <div class="menugl">
    <div class="layout-padding">
      <!--<transition-group name="list-complete" tag="tr">-->
      <p class="group">
        <button class="primary clear" @click="addMenu">
          <i>add</i>
        </button>
      </p>
      <q-data-table
        :data="table"
        :config="config"
        :columns="columns"
        @refresh="refresh"
      >
        <template slot="col-handle" scope="cell">
          <button class="primary clear" @click="editMenu(cell)">
            <i>edit</i>
          </button>
          <button class="primary clear" @click="deleteMenu(cell)">
            <i>delete</i>
          </button>
          <button class="primary clear" @click="addChildMenu(cell)">
            <i>add</i>
          </button>
        </template>

        <template slot="selection" scope="props">
          <button class="primary clear" @click="deleteMenus(props)">
            <i>delete</i>
          </button>
        </template>
      </q-data-table>
      <!--</transition-group>-->
    </div>
    <q-modal ref="edit" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <edit-menu ref="EditMenu" @hide="closeModal"></edit-menu>
    </q-modal>
    <q-modal ref="add" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <add-menu ref="AddMenu" @hide="closeModal"></add-menu>
    </q-modal>
  </div>
</template>

<script>
  import { Platform, Utils, Toast, Dialog } from 'quasar';
  import EditMenu from './EditMenu.vue';
  import AddMenu from './AddMenu.vue';

  export default {
    components: {
      EditMenu,
      AddMenu,
    },
    data() {
      return {
        editData: {},
        table: [],
        config: {
          title: '菜单管理',
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
            label: '菜单',
            field: '_name',
            width: '100px',
            filter: true,
            // sort: true,
          },
          {
            label: '编号',
            field: '_code',
            width: '100px'
          },
          {
            label: '排序',
            field: '_sort',
            // sort: true,
            filter: true,
            width: '60px'
          },
          {
            label: '网址',
            field: '_linkurl',
            // sort: true,
            filter: true,
            width: '160px'
          },
          {
            label: '备注',
            field: '_remark',
            // sort: true,
            // width: '120px'
          },
          // {
          //   label: '是否可见',
          //   field: '_isshow',
          //   // sort: true,
          //   width: '80px',
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
      editMenu(cell) {
        this.$http.get(`${this.serverAddress}/Menu/Details/${cell.row._id}`).then((response) => {
          if (response.data.Code === 1000) {
            const data = response.data.DataValue.rows;
            Object.keys(this.$refs.EditMenu.tableData).forEach((key) => {
              if (key.indexOf('sysoperationid') !== -1) return;
              this.$refs.EditMenu.tableData[key] = data[key];
            });
            this.$refs.EditMenu.tableData._sysoperationid = data._sysoperationidlist || [];
            this.$refs.EditMenu.tableData._sysoperationidold = (data._sysoperationidlist || []).slice();
            this.$refs.edit.open();
          } 
        });
        // Object.keys(this.$refs.EditMenu.tableData).forEach((key) => {
        //   if (key.indexOf('sysoperationid') !== -1) {
        //     console.log(cell.row[key]);
        //     this.$refs.EditMenu.tableData[key] = (cell.row[key] || '').split(',');
        //     return;
        //   }
        //   this.$refs.EditMenu.tableData[key] = cell.row[key];
        // });
        // // this.$refs.EditMenu._sysoperationidold = cell.row._sysoperationid.slice();
        // this.$refs.edit.open();
      },
      deleteMenu(cell) {
        const vm = this;
        Dialog.create({
          title: '删除菜单',
          message: '确认删除菜单？',
          buttons: [
            '否',
            {
              label: '是',
              handler() {
                vm.$http.post(`${vm.serverAddress}/Menu/Delete`, [{ _id: cell.row._id }]).then((response) => {
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
      deleteMenus(props) {
        const vm = this;
        Dialog.create({
          title: '删除菜单',
          message: '确认删除菜单？',
          buttons: [
            '否',
            {
              label: '是',
              handler() {
                vm.$http.post(`${vm.serverAddress}/Menu/Delete`, props.rows.map(cell => ({ _id: cell.data._id }))).then((response) => {
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
      addChildMenu(cell) {
        this.$refs.AddMenu.tableData._parentid = cell.row._id;
        this.$refs.add.open();
      },
      addMenu(props) {
        this.$refs.AddMenu.tableData._parentid = null;
        this.$refs.add.open();
      },
      fetchData(done) {
        this.$http.post(`${this.serverAddress}/Menu/GetData`, [
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
                // console.log(cid)
                const objRow = obj[cid];
                const row = data[objRow.index];
                arr.push(row);
                addRows(arr,cid);
              });
            }
            response.data.DataValue.rows.forEach((row, index) => {
              // if (!row._parentid || row._parentid.indexOf('00000000') === 0) result.push(row);
              if (row._parentid in obj) {
                obj[row._parentid]._childid.push(row._id);
              } else {
                obj[row._parentid] = { _childid: [row._id] };
              }
              if (row._id in obj) {
                obj[row._id]._parentid = row._parentid;
                obj[row._id].index = index;
              } else {
                obj[row._id] = { _childid: [], _parentid: row._parentid, index };
              }
            });
            // console.log(obj)
            if (obj[null]) addRows(result, null);
            this.table = result;
            // console.log(result);
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
