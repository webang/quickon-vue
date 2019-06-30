<template>
  <div class="hsb-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'hsb-container'
};
</script>

<style lang="postcss" scoped>
.hsb-container {
  position: relative;
}
</style>
