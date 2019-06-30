<template>
  <div class="hsb-coupon-list">
    <HsbCoupon v-for="(item, index) in couponList" :key="index"/>
  </div>
</template>

<script>
import HsbCoupon from '../hsb-coupon';
export default {
  name: 'hsb-coupon-list',
  props: {
    couponList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    HsbCoupon
  }
};
</script>

<style scoped>
.hsb-coupon-list {
  overflow: hidden;
  position: relative;
  padding: 0 12px;
}

.hsb-coupon-list /deep/ .hsb-coupon:nth-child(2n) {
  margin-left: 12px;
}
</style>
