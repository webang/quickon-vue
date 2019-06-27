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
  text-align: center;
  height: 44px;
  margin: 12px;
  line-height: 44px;
  background: #fefbee;
  text-decoration: none;
}
</style>
