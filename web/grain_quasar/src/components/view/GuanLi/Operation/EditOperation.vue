<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="1">
          编辑菜单
      </q-toolbar-title>
      <button @click="$emit('hide')">
          <i>close</i>
      </button>
    </div>
    <div slot="footer">
      <q-progress-button
        indeterminate
        class="primary"
        :percentage="changing"
        @click.native="change"
      >
        修改
      </q-progress-button>
      <button class="primary" @click="$emit('hide')">取消</button>
    </div>
    <div class="layout-view">
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
        <!--<div class="text-center">
          <button class="primary small" @click="change">修改</button>
        </div>-->
      </div>
    </div>
  </q-layout>
</template>

<script>
  import { Toast } from 'quasar';

  export default {
    data() {
      return {
        changing: 0,
        tableData: {
          _id: '',
          _function: '',
          _name: '',
          _parentid: '',
          _sort: '',
          _remark: '',
        },
      };
    },
    methods: {
      change() {
        this.changing = 50;
        this.$http.post(`${this.serverAddress}/Operation/Edit`, this.tableData).then((response) => {
          if (response.data.Code === 1000) {
            this.changing = 100;
            this.$emit('hide');
            Toast.create.positive('编辑操作成功！');
          } else {
            this.changing = 0;
            Toast.create.warning('编辑操作失败！');
          }
        }).catch((e) => {
          this.changing = 0;
          Toast.create.warning('编辑操作失败！');
        });
      },
    },
  };
</script>
