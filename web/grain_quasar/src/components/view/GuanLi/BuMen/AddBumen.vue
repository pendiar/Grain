<template>
    <div class="list no-border inner-delimiter highlight">
      <div class="item">
          <div class="item-content">
            部门：<input v-model="bumenData._name" placeholder="部门名称">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            编号：<input v-model="bumenData._code" placeholder="编号">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            排序：<input v-model.number="bumenData._sort" placeholder="排序">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            地址：<input v-model="bumenData._address" placeholder="地址">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            备注：<input v-model="bumenData._remark" placeholder="备注">
          </div>
      </div>
      <div class="text-center">
        <button class="primary small" @click="change">添加</button>
      </div>
    </div>
</template>

<script>
  import { Toast } from 'quasar'
  // Toast.create.positive({...})
  // Toast.create.negative({...})
  // Toast.create.warning({...})
  // Toast.create.info({...})
  export default {
    data() {
      return {
        bumenData: {
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
      refresh() {
        this.bumenData._code = '';
        this.bumenData._name = '';
        this.bumenData._address = '';
        this.bumenData._sort = '';
        this.bumenData._remark = '';
      },
      change() {
        this.$http.post(`${this.serverAddress}/Department/Create`, this.bumenData).then((response) => {
          if (response.data.Code === 1000) {
            this.refresh();
            this.$emit('hide');
            Toast.create.positive('新建组织成功！');
          } else {
            Toast.create.warning('新建组织失败！');
          }
        }).catch((e) => {
          Toast.create.warning('新建组织失败！');
        });
      },
    },
  };
</script>
