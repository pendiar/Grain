<template>
    <div class="list no-border inner-delimiter highlight">
      <div class="item">
          <div class="item-content">
            角色：<input v-model="tableData._name" placeholder="角色名称">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            排序：<input v-model.number="tableData._sort" placeholder="排序">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            备注：<input v-model="tableData._description" placeholder="备注">
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
    data() {
      return {
        tableData: {
          _id: '',
          _name: '',
          _parentid: '',
          _sort: '',
          _description: '',
        },
      };
    },
    methods: {
      change() {
        this.$http.post(`${this.serverAddress}/Role/Edit`, this.tableData).then((response) => {
          if (response.data.Code === 1000) {
            this.$emit('hide');
            Toast.create.positive('编辑角色成功！');
          } else {
            Toast.create.warning('编辑角色失败！');
          }
        }).catch((e) => {
          Toast.create.warning('编辑角色失败！');
        });
      },
    },
  };
</script>
