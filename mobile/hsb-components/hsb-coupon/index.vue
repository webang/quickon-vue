<template>
  <div class="hsb-coupon" :data-id="id" :data-url="url">
    <img :src="url" @click="handleClick" alt>
  </div>
</template>

<script>
import { Toast } from 'vant';
import baseApi from '../../apis/base';

export default {
  name: 'hsb-coupon',
  props: {
    id: {
      type: [Number, String],
      default: '0'
    },
    url: {
      type: String,
      default: 'https://s1.huishoubao.com/web/hsbh5/static/img/8.4c8ea3b.png'
    }
  },
  methods: {
    handleClick() {
      if (!this.$store.state.user.token) {
        this.$store.commit('user/setShowLogin', true);
      } else {
        this.doAddCoupon();
      }
    },
    doAddCoupon() {
      baseApi.addCoupon({ id: this.id }).then(res => {
        if (+res._errCode === 0) {
          Toast('领取成功');
        } else {
          Toast('领取失败: ' + res._errStr);
        }
      });
    }
  }
};
</script>

<style scoped>
.hsb-coupon {
  float: left;
  width: 168px;
  height: 116px;
  margin-top: 10px;
}
img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
