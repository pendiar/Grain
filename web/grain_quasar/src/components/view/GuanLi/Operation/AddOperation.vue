<template>
    <div class="list no-border inner-delimiter highlight">
      <div class="item">
          <div class="item-content">
            操作：<input v-model="tableData._name" placeholder="操作名称">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            方法：<input v-model="tableData._function" placeholder="方法">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            排序：<input v-model.number="tableData._sort" placeholder="排序">
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
    </div>
</template>

<script>
  import { Toast } from 'quasar';

  export default {
    data() {
      return {
        tableData: {
          _function: '',
          _name: '',
          _parentid: '',
          _sort: '',
          _remark: '',
        },
      };
    },
    methods: {
      refresh() {
        this.tableData._function = '';
        this.tableData._name = '';
        this.tableData._sort = '';
        this.tableData._remark = '';
      },
      change() {
        this.$http.post(`${this.serverAddress}/Operation/Create`, this.tableData).then((response) => {
          if (response.data.Code === 1000) {
            this.refresh();
            this.$emit('hide');
            Toast.create.positive('新建操作成功！');
          } else {
            Toast.create.warning('新建操作失败！');
          }
        }).catch((e) => {
          Toast.create.warning('新建操作失败！');
        });
      },
    },
  };
</script>
