<template>
  <div>
    <p class="hsb-text" v-html="text"></p>
    <input type="text" placeholder="1123">
    <a href="">baidu</a>
  </div>
</template>

<script>
export default {
  name: 'hsb-text',
  props: {
    text: {
      type: String,
      default: '我是文本內容'
    }
  }
};
</script>

<style lang="postcss" scoped>
.hsb-text {
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 24px;
}
</style>
