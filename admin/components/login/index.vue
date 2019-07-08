<template>
  <div class="login-wrapper">
    <!-- <el-radio-group v-model="labelPosition" size="small">
      <el-radio-button label="left">左对齐</el-radio-button>
      <el-radio-button label="right">右对齐</el-radio-button>
      <el-radio-button label="top">顶部对齐</el-radio-button>
    </el-radio-group>-->
    <div class="title">登录页面管理系统</div>
    <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
      <el-form-item label="登录账号">
        <el-input v-model="formLabelAlign.username"></el-input>
      </el-form-item>
      <el-form-item label="登录密码">
        <el-input v-model="formLabelAlign.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleLogin">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import pageApi from '../../apis/index';
import store from 'store';

export default {
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        username: 'c8c263d6',
        password: 'c8c263d6'
      }
    };
  },
  computed: {
    redirect() {
      return this.$route.query.redirect;
    }
  },
  methods: {
    handleLogin() {
      pageApi.login(this.formLabelAlign).then(res => {
        if (res.errCode === 0) {
          store.set('fk_user', res.data);
          store.set('fk_token', res.data.token);
          this.$message({
            type: 'success',
            message: '登录成功'
          });
          if (this.redirect) {
            this.$router.replace(this.redirect);
          }
        } else {
          this.$message({
            type: 'error',
            message: '登录失败'
          });
        }
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.login-wrapper {
  width: 600px;
  margin: 0 auto;
  margin-top: 200px;
}

.title {
  font-size: 30px;
  text-align: center;
  padding-bottom: 30px;
}
</style>
