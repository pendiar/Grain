<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <button @click="cancel">
        <i>keyboard_arrow_left</i>
      </button>
      <q-toolbar-title :padding="1">
        选择粮仓关系
      </q-toolbar-title>
    </div>
    <div slot="footer">
      <q-progress-button
        indeterminate
        class="primary"
        :percentage="submitPercentage"
        @click.native="submit"
      >
        确定
      </q-progress-button>
      <!--<button class="primary" @click="submit">确定</button>-->
      <button class="primary" @click="cancel">取消</button>
    </div>
    <div class="layout-view">
      <div class="list">
        <select-tree-item v-model="selectedGrain" v-for="item in grainArr" :item="item" :key="item.ID"></select-tree-item>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import SelectTreeItem from 'components/common/SelectTreeItem.vue';
  import GrainList from './GrainList.json';
  import { Toast } from 'quasar';

  export default {
    components:{
      SelectTreeItem,
    },
    props: ['userid', 'departmentid'],
    data() {
      return {
        selectedGrain: [],
        grainArr: [],
        submitPercentage: 0,
      };
    },
    methods: {
      refresh() {
        this.selectedGrain = [];
        this.submitPercentage = 0;
      },
      submit() {
        // console.log(this.selectedGrain);
        this.submitPercentage = 50;
        this.$http.post(`${this.serverAddress}/UserGranaryRights/SetUsersGranaryRights`, this.selectedGrain.map((item) => ({
          UserId: this.userid,
          GranaryNumber: item,
        }))).then((response) => {
          console.log(response.data);
          if (response.data.Code === 1000) {
            this.submitPercentage = 100;
            Toast.create.positive('修改成功！');
            this.cancel();
          } else {
            this.submitPercentage = 0;
            Toast.create.warning('修改失败！');
          }
        }, () => {
          this.submitPercentage = 0;
          Toast.create.warning('修改失败！');
        });
      },
      cancel() {
        this.$emit('hide');
      },
      getGrainList() {
        this.grainArr = GrainList;
        // this.$http.get(`${this.serverAddress}/UserGranaryRights/GetUserGranaryListByUid/${this.departmentid}`).then((response) => {
        //   console.log(response.data.DataValue.rows);
          
        //   }, () => {
        // });
      },
      getUserGrainList() {
        this.selectedGrain = [];
        this.$http.get(`${this.serverAddress}/UserGranaryRights/GetUserGranaryListByUid/${this.userid}`).then((response) => {
          console.log(response.data.DataValue.rows);
          if (response.data.Code === 1000) {
            this.selectedGrain = response.data.DataValue.rows.map(item => item.GranaryNumber);
          }
        }, () => {
        });
      },
    },
    created() {
    },
    watch: {
      userid: 'getUserGrainList',
      departmentid: 'getGrainList',
    }
  };
</script>

<style lang="less" scoped>
</style>
