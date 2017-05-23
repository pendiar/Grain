<template>
  <div class="edit-permission">
    <div class="layout-padding">
      <q-data-table :data="table" :config="config" :columns="columns" @refresh="refresh">
        <template slot="col-menu" scope="cell">
          <label>
            <span class="q-checkbox cursor-pointer"><input type="checkbox" v-model="checkData" :value="cell.row.Id"><div></div></span>
            <!--<q-checkbox v-model="checked" :val="check.split('^')[0]"></q-checkbox>-->
            {{cell.row.Name}}
          </label>
        </template>
        <template slot="col-handle" scope="cell">
          <label v-for="check in cell.row.isCheck.filter(check => check!=='^')">
            <span class="q-checkbox cursor-pointer"><input type="checkbox" v-model="checkData" :value="cell.row.Id+'^'+check.split('^')[0].toUpperCase()"><div></div></span>
            <!--<q-checkbox v-model="checked" :val="check.split('^')[0]"></q-checkbox>-->
            {{check.split('^')[1]}}
          </label>
        </template>
  
        <!--<template slot="selection" scope="props">
            <button class="primary clear" @click="deleteMenus(props)">
              <i>delete</i>
            </button>
          </template>-->
      </q-data-table>
      <div>
        <button @click="save">保存</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Platform, Utils, Toast, Dialog } from 'quasar';


export default {
  components: {

  },
  data() {
    return {
      // menuData: [],
      checkData: [],
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
        // selection: 'multiple',
        messages: {
          noData: '<i>warning</i> 暂无数据！',
          noDataAfterFiltering: '<i>warning</i> 无匹配数据，请检查筛选项！'
        }
      },
      columns: [
        {
          label: '菜单',
          field: 'menu',
          width: '120px',
          // filter: true,
          // sort: true,
        },
        {
          label: '操作',
          field: 'handle',
          // width: '180px',
        },
      ],
    };
  },
  methods: {
    save() {
      this.$http.post(`${this.serverAddress}/Role/SaveRoleRights`, { ids: this.checkData.join(','), roleid: this.$route.params.id })
      .then((response) => {
        if (response.data.Code === 1000) {
          Toast.create.positive('保存成功！');
        } else {
          Toast.create.warning('保存失败！');
        }
      }, (error) => {
        Toast.create.warning('保存失败！');
      });
    },
    refresh(done) {
      this.$http.get(`${this.serverAddress}/Menu/GetMenuTree`).then((response) => {
        if (response.data.Code === 1000) {
          const obj = {};
          const result = [];
          const data = response.data.DataValue.rows;
          function addRows(arr, id) {
            obj[id].Childid.forEach((cid) => {
              // console.log(cid)
              // const objRow = obj[cid];
              // const row = data[objRow.index];
              // arr.push(row);
              arr.push(obj[cid]);
              addRows(arr, cid);
            });
          }
          response.data.DataValue.rows.rows.forEach((row, index) => {
            const ParentId = row.ParentId || 'top';
            // if (!ParentId || ParentId.indexOf('00000000') === 0) result.push(row);
            if (ParentId in obj) {
              if (obj[ParentId].Childid.indexOf(row.Id) === -1) obj[ParentId].Childid.push(row.Id);
            } else {
              obj[ParentId] = { Childid: [row.Id], isCheck: [] };
            }
            if (row.Id in obj) {
              obj[row.Id].ParentId = ParentId;
              obj[row.Id].Id = row.Id;
              obj[row.Id].Name = row.Name;
              obj[row.Id].isCheck.push(row.isCheck);
            } else {
              obj[row.Id] = { Childid: [], ParentId, Id: row.Id, Name:row.Name, isCheck: [row.isCheck] };
            }
          });
          // console.log(obj)
          if (obj.top) addRows(result, 'top');
          // console.log(result)
          this.table = result;
          this.$http.get(`${this.serverAddress}/Menu/GetMenuRights/${this.$route.params.id}`).then((response) => {
            if(response.data.Code === 1000) {
              // const oData = response.data.DataValue.rows;
              // const menuData = [];
              // oData.map(menu => menu.split('^')[0]).forEach((menu) => {
              //   if (menuData.indexOf(menu) === -1) menuData.push(menu);
              // });
              // const checkData = oData.filter(menu => menu.indexOf('^') !== -1);
              // this.menuData = menuData;
              // this.checkData = checkData;
              this.checkData = response.data.DataValue.rows;
            }
          });
        }
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.refresh();
    });
  },
};
</script>

<style lang="less" scoped>

</style>
