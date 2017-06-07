<template>
    <div class="list no-border inner-delimiter highlight">
      <div class="item">
          <div class="item-content">
            菜单：<input v-model="tableData._name" placeholder="菜单名称">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            编号：<input v-model="tableData._code" placeholder="编号">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            排序：<input v-model.number="tableData._sort" placeholder="排序">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            网址：<input v-model="tableData._linkurl" placeholder="网址">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            操作：
            <q-select
              type="checkbox"
              v-model="tableData._sysoperationid"
              :options="operation"
              multiple
            ></q-select>
            <!--<input v-model="tableData._linkurl" placeholder="网址">-->
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            图标：<button class="primary clear" @click="$refs.icon.open()"><i>{{tableData._iconic}}</i> 选择图标</button>
            <!--<input v-model="tableData._iconic" placeholder="图标">-->
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            备注：<input v-model="tableData._remark" placeholder="备注">
          </div>
      </div>
      <div class="text-center">
        <button class="primary small" @click="change">添加</button>
      </div>
      <q-modal ref="icon" :content-css="{width: '800px', height: '600px'}">
        <q-layout>
            <div slot="header" class="toolbar">
              <q-toolbar-title :padding="1">
                  选择图标
              </q-toolbar-title>
              <button @click="$refs.icon.close()">
                  <i>close</i>
              </button>
            </div>
            <div class="layout-view">
              <button class="primary clear icon-btn" v-for="name in icon" @click="chooseIcon(name)"><i>{{name}}</i></button>
              <!--<i class="icon" v-for="name in icon" @click="chooseIcon(name)">{{name}}</i>-->
            </div>
        </q-layout>
      </q-modal>
    </div>
</template>

<script>
  import icon from 'assets/icon.json';
  import { Toast } from 'quasar';

  export default {
    computed: {
      postData() {
        return {
          _code: this.tableData._code,
          _name: this.tableData._name,
          _parentid: this.tableData._parentid,
          _linkurl: this.tableData._linkurl,
          _sort: this.tableData._sort,
          _iconic: this.tableData._iconic,
          _remark: this.tableData._remark,
          _sysoperationid: this.tableData._sysoperationid.join(','),
          _sysoperationidold: '',
        }
      },
    },
    data() {
      return {
        icon,
        operation: [],
        tableData: {
          _code: '',
          _name: '',
          _parentid: '',
          _linkurl: '',
          _sort: '',
          _iconic: '',
          _remark: '',
          _sysoperationid: [],
          // _sysoperationidold: [],
        },
      };
    },
    methods: {
      chooseIcon(name) {
        this.tableData._iconic = name;
        this.$refs.icon.close();
      },
      refresh() {
        this.tableData._code = '';
        this.tableData._name = '';
        this.tableData._linkurl = '';
        this.tableData._sort = '';
        this.tableData._iconic = '';
        this.tableData._remark = '';
        this.tableData._sysoperationid = [];
        this.tableData._sysoperationidold = [];
      },
      change() {
        this.$http.post(`${this.serverAddress}/Menu/Create`, this.postData).then((response) => {
          if (response.data.Code === 1000) {
            console.log(response.data.Code)
            this.refresh();
            this.$emit('hide');
            Toast.create.positive('新建菜单成功！');
          } else {
            Toast.create.warning('新建菜单失败！');
          }
        }).catch((error) => {
          console.log(error)
          Toast.create.warning('新建菜单失败！');
        });
      },
      setOperation() {
        this.$http.post(`${this.serverAddress}/Operation/GetData`, [
          "PageIndex^1",
          "PageCount^10000",
          "Sort^Name",
          "OrderType^desc",
          "StartDate^2016-11-11",
          "EndDate^2017-12-11",
        ]).then((response) => {
          if (response.data.Code === 1000) {
            this.operation = response.data.DataValue.rows.map((operation) => ({
              label: operation._name,
              value: operation._id,
            }));
          }
        });
      },
    },
    created() {
      this.setOperation();
    },
  };
</script>

<style lang="less" scoped>
  .icon-btn{
    // font-size: 20px;
    // padding: 5px;
    margin: 5px 5px;
    // width: 100px;
    // span{
    //   font-size: 12px;
    // }
  }
</style>
