<template>
    <div class="list no-border inner-delimiter highlight">
      <div class="item">
          <div class="item-content">
            操作：<input v-model="tableData._name" placeholder="操作名称">
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
            地址：<input v-model="tableData._address" placeholder="地址">
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
  export default {
    data() {
      return {
        tableData: {
          _id: '',
          _code: '',
          _name: '',
          _parentid: '',
          _address: '',
          _sort: '',
          _remark: '',
        },
      };
    },
    methods: {
      change() {
        this.$http.post(`${this.serverAddress}/Operation/Edit`, this.tableData).then((response) => {
          if (response.data.code === 1000) {
            this.$emit('hide');
          }
        });
      },
    },
  };
</script>
