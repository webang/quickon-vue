<template>
  <div class="hsb-click-area">
    <img v-if="img" :src="img" alt>
    <span v-if="text">{{ text }}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'hsb-click-area',
  props: {
    img: {
      type: String,
      default: ''
    },
    text: {
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
  left: 10px;
  top: 10px;
  width: 50px;
  height: 50px;
  border: 1px red solid;
}
</style>
