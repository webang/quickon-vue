<template>
  <div class="hsb-click-area">
    <img v-if="url" :src="url" alt>
    <span v-if="text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'hsb-click-area',
  props: {
    url: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    link: {
      type: String,
      default: ''
    }
  }
};
</script>

<style lang="postcss" scoped>
.hsb-click-area {
  z-index: 5;
  position: absolute;
  left: 0;
  top: 0;
  width: 50px;
  height: 50px;
  border: 1px red solid;
}
</style>
