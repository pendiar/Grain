<template>
  <div class="bu-men">
    <!--<div class="layout-padding">-->
      <!--<transition-group name="list-complete" tag="tr">-->
      <p class="group">
        <button class="primary" @click="addBumen" v-if="$bus.states.userInfo&&$bus.states.userInfo.LoginID==='admin'||rights.indexOf('flexiCreate')!==-1">
          <i>add</i> 添加组织
        </button>
      </p>
      <q-data-table
        :data="filterData"
        :config="config"
        :columns="columns"
        @refresh="refresh"
      >
        <template slot="col-name" scope="cell">
          <span :class="{childMenu:cell.row._code&&cell.row._code.length>3}" :style="{marginLeft:30*(cell.row._code.length-3)/2+'px'}">{{cell.row._name}}</span>
          <button class="primary clear handle" @click="toggle(cell)" v-if="$bus.states.userInfo&&$bus.states.userInfo.LoginID==='admin'||rights.indexOf('flexiModify')!==-1">
            <i v-if="filterData[cell.row.__index+1] && filterData[cell.row.__index+1]._code.indexOf(cell.row._code) === 0 || hideDataArr.indexOf(cell.row._code) !== -1">{{hideDataArr.indexOf(cell.row._code) === -1 ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}}</i>
          </button>
        </template>
        <template slot="col-handle" scope="cell">
          <button class="primary clear handle" @click="editBumen(cell)" v-if="$bus.states.userInfo&&$bus.states.userInfo.LoginID==='admin'||rights.indexOf('flexiModify')!==-1">
            <i>edit</i>
          </button>
          <button class="primary clear handle" @click="deleteBumen(cell)" v-if="$bus.states.userInfo&&$bus.states.userInfo.LoginID==='admin'||rights.indexOf('flexiDelete')!==-1">
            <i>delete</i>
          </button>
          <!--<button class="primary clear handle" @click="addChildBumen(cell)" v-if="$bus.states.userInfo&&$bus.states.userInfo.LoginID==='admin'||rights.indexOf('flexiCreate')!==-1">
            <i>add</i>
          </button>-->
        </template>

        <template slot="selection" scope="props">
          <button class="primary clear" @click="deleteBumens(props)" v-if="$bus.states.userInfo&&$bus.states.userInfo.LoginID==='admin'||rights.indexOf('flexiDelete')!==-1">
            <i>delete</i>
          </button>
        </template>
      </q-data-table>
      <!--</transition-group>-->
    <!--</div>-->
    <q-modal ref="edit" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
      <edit-bumen ref="EditBumen" @hide="closeModal"></edit-bumen>
    </q-modal>
    <q-modal ref="add" :content-css="{minWidth: '50vw', minHeight: '50vh'}">
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
    computed: {
      filterData() {
        return this.oData.filter(item => this.hideDataArr.every(hide => item._code === hide || item._code.indexOf(hide) !== 0)).sort((a, b) => ((a._code > b._code) ? 1 : -1))
      }
    },
    data() {
      return {
        hideDataArr: [],  
        oData: [],
        rights: [],
        editData: {},
        table: [],
        config: {
          title: '组织管理',  
          refresh: true,
          // columnPicker: true,
          // leftStickyColumns: 1,
          // rightStickyColumns: 2,
          bodyStyle: {
            // maxHeight: Platform.is.mobile ? '50vh' : '500px'
          },
          rowHeight: '50px',
          // responsive: true,
          // pagination: {
          //   rowsPerPage: 15,
          //   options: [5, 10, 15, 30, 50, 500]
          // },
          selection: 'multiple',
          messages: {
            noData: '<i>warning</i> 暂无数据！',
            noDataAfterFiltering: '<i>warning</i> 无匹配数据，请检查筛选项！'
          }
        },
        columns: [
          {
            label: '组织',
            field: 'name',
            width: '280px',
            // filter: true,
            // sort: true,
          },
          {
            label: '编号',
            field: '_code',
            width: '100px'
          },
          // {
          //   label: '排序',
          //   field: '_sort',
          //   // sort: true,
          //   // filter: true,
          //   width: '60px'
          // },
          {
            label: '地址',
            field: '_address',
            // sort: true,
            // filter: true,
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
            width: '120px',
          },
        ],
      };
    },
    methods: {
      toggle(cell) {
        const idx = this.hideDataArr.indexOf(cell.row._code);
        if (idx !== -1) {
          this.hideDataArr.splice(idx, 1);
        } else {
          this.hideDataArr.push(cell.row._code);
        }
      },
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
            this.oData = data;
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
      setRights() {
        if (!this.$bus.states.userInfo.RoleIdList || !this.$bus.states.userInfo.RoleIdList[0]) {
          this.rights = [];
          return;
        }
        this.$http.get(`${this.serverAddress}/Operation/GetToolbar/${this.$route.query.id || "49F61C91-FF25-4A23-9FFC-A95B85207F08"}/${this.$bus.states.userInfo.RoleIdList[0]._id || 'null'}`).then((response) => {
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
    created() {
      this.fetchData();
    },
    beforeRouteEnter(to, from, next) {
      next((vm) => {
        vm.setRights();
      });
    },
  };
</script>

<style lang="less" scoped>
  .childMenu{
    position: relative;
    margin-left: 30px;
    &:before{
      content: '';
      position: absolute;
      top: auto;
      width: 1px;
      height: 4rem;
      right: auto;
      left: -22px;
      border-left: 1px solid #ccc;
      bottom: -1rem;
    }
    &:after {
      content: '';
      position: absolute;
      top: 9px;
      width: 20px;
      height: 20px;
      right: auto;
      left: -22px;
      border-top: 1px solid #ccc;
    }
  }
</style>
