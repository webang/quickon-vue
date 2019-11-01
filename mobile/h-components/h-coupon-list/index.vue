<template>
  <div class="h-coupon-list">
    <hCoupon
      v-for="(item, index) in couponList"
      :key="index"
      :id="item.id"
      :url="item.url"
    />
  </div>
</template>

<script>
import hCoupon from '../h-coupon';
export default {
  name: 'h-coupon-list',
  props: {
    couponList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    hCoupon
  }
};
</script>

<style scoped>
.h-coupon-list {
  overflow: hidden;
  position: relative;
  padding: 0 12px;
}

.h-coupon-list /deep/ .h-coupon:nth-child(2n) {
  margin-left: 12px;
}
</style>
