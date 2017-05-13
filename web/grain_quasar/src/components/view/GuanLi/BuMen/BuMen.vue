<template>
  <div class="bu-men">
    <div class="layout-padding">
      <!--<transition-group name="list-complete" tag="tr">-->
      <q-data-table
        :data="table"
        :config="config"
        :columns="columns"
        @refresh="refresh"
      >
        <template slot="col-handle" scope="cell">
          <button class="primary clear" @click="editBumen(cell)">
            <i>edit</i>
          </button>
          <button class="primary clear" @click="deleteBumen(cell)">
            <i>delete</i>
          </button>
          <button class="primary clear" @click="addChildBumen(cell)">
            <i>add</i>
          </button>
        </template>

        <template slot="selection" scope="props">
          <button class="primary clear" @click="deleteBumens(props)">
            <i>delete</i>
          </button>
        </template>
      </q-data-table>
      <!--</transition-group>-->
      <p class="text-center">
        <button class="primary clear" @click="addBumen">
          <i>add</i>
        </button>
      </p>
    </div>
    <q-modal ref="edit" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <edit-bumen ref="EditBumen" @hide="closeModal"></edit-bumen>
    </q-modal>
    <q-modal ref="add" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
      <add-bumen ref="AddBumen" @hide="closeModal"></add-bumen>
    </q-modal>
  </div>
</template>

<script>
  import { Platform, Utils, Toast, Dialog } from 'quasar';
  import EditBumen from './EditBumen.vue';
  import AddBumen from './AddBumen.vue';

  export default {
    components: {
      EditBumen,
      AddBumen,
    },
    data() {
      return {
        editData: {},
        table: [],
        config: {
          title: '组织管理',
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
            label: '组织',
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
            label: '地址',
            field: '_address',
            // sort: true,
            filter: true,
            width: '120px'
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
      editBumen(cell) {
        Object.keys(this.$refs.EditBumen.bumenData).forEach((key) => {
          this.$refs.EditBumen.bumenData[key] = cell.row[key];
        });
        this.$refs.edit.open();
      },
      deleteBumen(cell) {
        const vm = this;
        Dialog.create({
          title: '删除组织',
          message: '确认删除组织？',
          buttons: [
            '否',
            {
              label: '是',
              handler() {
                vm.$http.post(`${vm.serverAddress}/Department/Delete`, [{ _id: cell.row._id }]).then((response) => {
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
      deleteBumens(props) {
        const vm = this;
        Dialog.create({
          title: '删除组织',
          message: '确认删除组织？',
          buttons: [
            '否',
            {
              label: '是',
              handler() {
                console.log(props)
                vm.$http.post(`${vm.serverAddress}/Department/Delete`, props.rows.map(cell => ({ _id: cell.data._id }))).then((response) => {
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
      addChildBumen(cell) {
        this.$refs.AddBumen.bumenData._parentid = cell.row._id;
        this.$refs.add.open();
      },
      addBumen() {
        this.$refs.AddBumen.bumenData._parentid = '00000000-000-000-000';
        this.$refs.add.open();
      },
      fetchData(done) {
        this.$http.post(`${this.serverAddress}/Department/GetData`, [
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
                obj[row._id].index = index;
              } else {
                obj[row._id] = { _childid: [], _parentid: row._parentid, index };
              }
            });
            if (result.length) addRows(result, result[0]._id);
            this.table = result;
            // alert(JSON.stringify(this.table));
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
