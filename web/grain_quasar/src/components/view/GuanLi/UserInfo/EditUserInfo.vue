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
              用户名：<input v-model="tableData._loginid" placeholder="用户名">
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              密码：<input v-model="tableData._password" type="password" placeholder="密码">
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              确认密码：<input v-model="surePassword" type="password" placeholder="确认密码">
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              真实名：<input v-model.number="tableData._nickname" placeholder="真实名">
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              组织：
              <q-select
                type="radio"
                v-model="tableData._departmentid"
                :options="department"
              ></q-select>
              <!--<input v-model="tableData._departmentid" placeholder="组织">-->
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              角色：
              <q-select
                type="radio"
                v-model="tableData._roleid"
                :options="role"
              ></q-select>
              <!--<input v-model="tableData._roleid" placeholder="角色">-->
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              性别：
              <label>
                <q-radio v-model="tableData._sex" val="男"></q-radio>
                男
              </label>
              <label>
                <q-radio v-model="tableData._sex" val="女"></q-radio>
                女
              </label>
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              座机：<input v-model="tableData._telphone" placeholder="座机">
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              手机：<input v-model="tableData._phonenumber" placeholder="手机">
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              邮箱：<input v-model="tableData._emailaddress" placeholder="邮箱">
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              住址：<input v-model="tableData._address" placeholder="住址">
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              备注：<input v-model="tableData._remark" placeholder="备注">
            </div>
        </div>
        <div class="item">
            <div class="item-content">
              是否启用：
              <label>
                <q-radio v-model="tableData._state" val="开启"></q-radio>
                开启
              </label>
              <label>
                <q-radio v-model="tableData._state" val="关闭"></q-radio>
                关闭
              </label>
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
    computed: {
      postData() {
        return {
          _id: this.tableData._id,
          _loginid: this.tableData._loginid,
          _nickname: this.tableData._nickname,
          _password: this.tableData._password === this.oldPassword ? '' : this.tableData._password,
          _sex: this.tableData._sex,
          _departmentid: this.tableData._departmentid,
          _roleid: this.tableData._roleid,
          _telphone: this.tableData._telphone,
          _phonenumber: this.tableData._phonenumber,
          _emailaddress: this.tableData._emailaddress,
          _state: this.tableData._state,
          _address: this.tableData._address,
          _remark: this.tableData._remark,
        }
      },
    },
    data() {
      return {
        changing: 0,
        role: [],
        department: [],
        oldPassword: '',
        surePassword: '',
        tableData: {
          _id: '',
          _loginid: '',
          _nickname: '',
          _password: '',
          _sex: '',
          _departmentid: '',
          _roleid: '',
          _telphone: '',
          _phonenumber: '',
          _emailaddress: '',
          _state: '',
          _address: '',
          _remark: '',
        },
      };
    },
    methods: {
      change() {
        if (this.surePassword !== this.tableData._password) {
          Toast.create.warning('密码不一致！');
          return;
        }
        this.changing = 50;
        this.$http.post(`${this.serverAddress}/UserInfo/Edit`, this.postData).then((response) => {
          if (response.data.Code === 1000) {
            this.changing = 100;
            this.$emit('hide');
            Toast.create.positive('编辑用户成功！');
          } else {
            this.changing = 0;
            Toast.create.warning('编辑用户失败！');
          }
        }).catch((error) => {
          this.changing = 0;
          Toast.create.warning('编辑用户失败！');
        });
      },
      setDepartment() {
        this.$http.post(`${this.serverAddress}/Department/GetData`, [
          "PageIndex^1",
          "PageCount^1000",
          "Sort^Name",
          "OrderType^desc",
          "StartDate^2016-11-11",
          "EndDate^2017-12-11",
        ]).then((response) => {
          // alert(JSON.stringify(response.data.DataValue))
          if (response.data.Code === 1000) {
            const obj = {};
            let result = [];
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
              if (row._parentid in obj) {
                obj[row._parentid]._childid.push(row._id);
              } else {
                obj[row._parentid] = { _childid: [row._id] };
              }
              if (row._id in obj) {
                obj[row._id]._parentid = row._parentid;
                obj[row._id].index = index;
              } else {
                obj[row._id] = { _childid: [], _parentid: row._parentid, index };
              }
            });
            // console.log(obj)
            // if (obj['00000000-0000-0000-0000-000000000000']) addRows(result, null);
            obj['00000000-0000-0000-0000-000000000000']._childid.forEach((id) => {
              result = result.concat(obj[id]._childid.map((cid) => {
                const bumen = data[obj[cid].index];
                return { value: bumen._id, label: bumen._name };
              }));
            });
            this.department = result;
            // console.log(result);
          }
        });
      },
      setRole() {
        this.$http.post(`${this.serverAddress}/Role/GetData`, [
          "PageIndex^1",
          "PageCount^10000",
          "Sort^Name",
          "OrderType^desc",
          "StartDate^2016-11-11",
          "EndDate^2017-12-11",
        ]).then((response) => {
          if (response.data.Code === 1000) {
            this.role = response.data.DataValue.rows.map((role) => ({ label: role._name, value: role._id }));
          }
        });
      },
    },
    created() {
      this.setDepartment();
      this.setRole();
    },
  };
</script>
