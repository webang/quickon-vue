<template>
  <p class="h-text" v-html="text"></p>
</template>

<script>
export default {
  name: 'h-text',
  props: {
    text: {
      type: String,
      default: '我是文本內容'
    }
  }
};
</script>

<style lang="postcss" scoped>
.h-text {
  font-size: 14px;
  padding-left: 10px;
  padding-right: 10px;
  line-height: 24px;
}
</style>
