<template>
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
            组织：<input v-model="tableData._departmentid" placeholder="组织">
          </div>
      </div>
      <div class="item">
          <div class="item-content">
            角色：<input v-model="tableData._roleid" placeholder="角色">
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
        this.$http.post(`${this.serverAddress}/UserInfo/Edit`, this.postData).then((response) => {
          if (response.data.Code === 1000) {
            this.$emit('hide');
            Toast.create.positive('编辑用户成功！');
          } else {
            Toast.create.warning('编辑用户失败！');
          }
        }).catch((error) => {
          console.log(error)
          Toast.create.warning('编辑用户失败！');
        });
      },
    },
  };
</script>
