<template>
  <a class="hsb-link" :href="link">{{ text }}</a>
</template>

<script>
export default {
  name: 'hsb-link',
  props: {
    link: {
      type: String,
      default: 'https://mobile.huishoubao.com'
    },
    text: {
      type: String,
      default: '立即估价'
    }
  }
};
</script>

<style scoped>
.hsb-link {
  display: block;
  height: 44px;
  line-height: 44px;
  background: #fefbee;
  text-align: center;
  text-decoration: none;
}
</style>
