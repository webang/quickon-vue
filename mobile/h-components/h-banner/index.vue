<template>
  <van-swipe data-name="h-banner">
    <van-swipe-item v-for="(item, index) in list" :key="index" @click="handleClick(index)">
      <img :src="item.img" alt>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'h-banner',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClick (index) {
      console.log(index)
    }
  }
}
</script>

<style lang="postcss" scoped>
img {
  display: block;
  width: 100%;
}
</style>
