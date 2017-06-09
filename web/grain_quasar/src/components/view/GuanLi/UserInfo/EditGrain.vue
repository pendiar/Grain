<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
        编辑粮仓关系
        组织：
        <button class="primary small">
          {{departmentName || '请选择组织'}}
          <q-popover ref="popover">
            <!--
              The DOM element(s) that make up the Dropdown menu,
              in this case a list
            -->
            <q-tree
              :model="departmentList"
              contract-html="<i>remove_circle</i>"
              expand-html="<i>add_circle</i>"
            ></q-tree>
          </q-popover>
        </button>
      </q-toolbar-title>
      <button @click="cancel">
        <i>close</i>
      </button>
    </div>
    <div slot="footer">
      <q-progress-button
        indeterminate
        class="primary"
        :percentage="submitPercentage"
        @click.native="submit"
      >
        保存
      </q-progress-button>
      <!--<button class="primary" @click="submit">确定</button>-->
      <button class="primary" @click="cancel">取消</button>
    </div>
    <div class="layout-view">
      <!--<div class="edit-grain-permission">-->
        <!--<div class="item ">
          <div class="item-content">
            组织：
          </div>
        </div>-->
        <div class="row">
          <div class="width-1of2">
            <div class="list">
              <label class="item item-link non-selectable item-collapsible" v-for="item in personArr">
                <div class="item-primary">
                  <span class="q-checkbox cursor-pointer"><input type="checkbox" v-model="selectedUser" :value="item.Id"><div></div></span>
                </div>
                <div class="item-content">
                    <div>{{item.NickName || item.LoginID}}</div>
                </div>
              </label>
            </div>
          </div>
          <div class="width-1of2">
            <div class="list">
              <select-tree-item v-model="selectedGrain" v-for="item in grainArr" :item="item" :key="item.ID"></select-tree-item>
            </div>
          </div>
        </div>
        <!--<p class="group">
          <button class="primary" @click="cancel">取消</button>
        </p>-->
      <!--</div>-->
    </div>
  </q-layout>
</template>

<script>
  import SelectTreeItem from 'components/common/SelectTreeItem.vue';

  export default {
    components:{
      SelectTreeItem,
    },
    data() {
      return {
        submitPercentage: 0,
        departmentId: '',
        departmentName: '',
        departmentList: [],
        selectedUser: [],
        selectedGrain: [],
        personArr: [],
        grainArr: [],
      };
    },
    methods: {
      submit() {
        // console.log(this.selectedGrain);
        this.submitPercentage = 50;
        let data = [];
        this.selectedUser.forEach((user) => {
          data = data.concat(this.selectedGrain.map(Granary => ({ UserId: user, GranaryNumber: Granary })));
        });
        // if (data.length === 0) data = [{ UserId: this.userid }];
        this.$http.post(`${this.serverAddress}/UserGranaryRights/SetUsersGranaryRights`, data).then((response) => {
          // console.log(response.data);
          if (response.data.Code === 1000) {
            this.submitPercentage = 100;
            Toast.create.positive('编辑成功！');
            this.cancel();
          } else {
            this.submitPercentage = 0;
            Toast.create.warning('编辑失败！');
          }
        }, () => {
          this.submitPercentage = 0;
          Toast.create.warning('编辑失败！');
        });
      },
      cancel() {
        this.$emit('hide');
      },
      chooseItem(item) {
        this.departmentId = item.value;
        this.departmentName = item.title;
        this.$refs.popover.close();
      },
      setDepartment() {
        const vm = this;
        this.$http.post(`${this.serverAddress}/Department/GetData`, [
          "PageIndex^1",
          "PageCount^1000",
          "Sort^Name",
          "OrderType^desc",
          "StartDate^2016-11-11",
          "EndDate^2020-12-11",
        ]).then((response) => {
          // alert(JSON.stringify(response.data.DataValue))
          if (response.data.Code === 1000) {
            const obj = {};
            // let result = [];
            const data = response.data.DataValue.rows;
            // function addRows(arr,id) {
            //   obj[id]._childid.forEach((cid) => {
            //     // console.log(cid)
            //     const objRow = obj[cid];
            //     const row = data[objRow.index];
            //     arr.push(row);
            //     addRows(arr,cid);
            //   });
            // }
            data.forEach((row, index) => {
              // if (!row._parentid || row._parentid === '00000000-0000-0000-0000-000000000000') result.push(row);
              if (row._id in obj) {
                obj[row._id].title = row._name;
                // obj[row._id]._parentid = row._parentid;
                // obj[row._id].index = index;
              } else {
                obj[row._id] = { children: [], title: row._name, value: row._id, expanded: false, handler (item) { vm.chooseItem(item); } };
              }
              if (row._parentid in obj) {
                obj[row._parentid].children.push(obj[row._id]);
              } else {
                obj[row._parentid] = { children: [obj[row._id]], value: row._parentid, expanded: false, handler (item) { vm.chooseItem(item); } };
              }
            });
            // console.log(obj)
            // if (obj['00000000-0000-0000-0000-000000000000']) addRows(result, null);
            // obj['00000000-0000-0000-0000-000000000000']._childid.forEach((id) => {
            //   result = result.concat(obj[id]._childid.map((cid) => {
            //     const bumen = data[obj[cid].index];
            //     return { value: bumen._id, label: bumen._name };
            //   }));
            // });
            this.departmentList = obj['00000000-0000-0000-0000-000000000000'].children;
            // alert(JSON.stringify(this.departmentList))
          }
        });
      },
    },
    created() {
    },
    watch: {
      departmentId(val) {
        this.$http.get(`${this.serverAddress}/UserGranaryRights/GetUsersAndGranarysByOrg/${val}`).then((response) => {
          if (response.data.Code === 1000) {
            this.personArr = response.data.DataValue.rows.personArr;
            this.grainArr = response.data.DataValue.rows.grainArr;

          }
        });
      }
    }
  };
</script>

<style lang="less" scoped>

</style>
