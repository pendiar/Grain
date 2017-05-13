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
            ></q-select>
            <!--<input v-model="tableData._linkurl" placeholder="网址">-->
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            备注：<input v-model="tableData._remark" placeholder="备注">
          </div>
      </div>
      <div class="text-center">
        <button class="primary small" @click="change">修改</button>
      </div>
    </div>
</template>

<script>
  import { Toast } from 'quasar';

  export default {
    computed: {
      postData() {
        return {
          _id: this.tableData._id,
          _code: this.tableData._code,
          _name: this.tableData._name,
          _parentid: this.tableData._parentid,
          _linkurl: this.tableData._linkurl,
          _sort: this.tableData._sort,
          _remark: this.tableData._remark,
          _sysoperationid: this.tableData._sysoperationid.join(','),
          _sysoperationidold: this.tableData._sysoperationidold.join(','),
        }
      },
    },
    data() {
      return {
        operation: [],
        tableData: {
          _id: '',
          _code: '',
          _name: '',
          _parentid: '',
          _linkurl: '',
          _sort: '',
          _remark: '',
          _sysoperationid: [],
          _sysoperationidold: [],
        },
      };
    },
    methods: {
      change() {
        this.$http.post(`${this.serverAddress}/Menu/Edit`, this.postData).then((response) => {
          if (response.data.Code === 1000) {
            this.$emit('hide');
            Toast.create.positive('编辑菜单成功！');
          } else {
            Toast.create.warning('编辑菜单失败！');
          }
        }).catch((error) => {
          console.log(error)
          Toast.create.warning('编辑菜单失败！');
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
