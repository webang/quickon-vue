<template>
  <div class="view view-login">
    <div class="form">
      <van-cell-group>
        <div class="form-item">
          <van-field class="tel-input" v-model="tel" placeholder="手机号码"/>
          <van-button
            class="code-button"
            type="primary"
            size="small"
            :disabled="tel.length !== 11"
            @click="handleGetCode"
          >获取验证码</van-button>
        </div>
        <van-field v-model="code" placeholder="短信验证码"/>
      </van-cell-group>
      <van-button
        class="button"
        type="primary"
        size="large"
        :loading="loading"
        :disabled="disabled"
        @click="handleLogin"
      >立即登录</van-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Field, Button, CellGroup, Cell, Toast } from 'vant';
import { mapState } from 'vuex';
import store from 'store';
import baseApi from '../../apis/base';

Vue.use(Field)
  .use(Button)
  .use(CellGroup)
  .use(Cell);

export default {
  props: {
    onLogin: Function
  },
  data() {
    return {
      tel: '13249064450',
      code: '143934',
      imgCode: '',
      loading: false
    };
  },
  computed: {
    disabled() {
      return this.tel.length !== 11 || this.code.length < 6;
    },
    redirect() {
      return this.$route.query.redirect;
    }
  },
  created() {
    if (this.$route.query.authType) {
      this.authType = this.$route.query.authType;
    }
  },
  methods: {
    async handleGetCode() {
      baseApi.getCode(this.tel, this.imgCode).then(res => {
        console.log(res);
      });
    },
    async handleLogin() {
      baseApi.login(this.tel, this.code).then(res => {
        if (+res._errCode === 0) {
          store.set('userInfo', res._data);
          store.set('token', res._data.token);
        } else {
          Toast(res._errStr);
        }
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.view {
  min-height: 100vh;
  background: #f5f5f5;
}

.form-item {
  overflow: hidden;
}

.tel-input {
  float: left;
  width: 200px;
}

.code-button {
  float: right;
  margin-top: 10px;
  margin-right: 10px;
}

.form {
  padding: 12px;
}

.button {
  margin-top: 20px;
}

.btm-wrap {
  color: #999;
  font-size: 14px;
  margin-top: 10px;
  text-align: right;
}

.btn-toggle {
  color: #07c160;
}
</style>
