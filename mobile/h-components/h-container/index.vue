<template>
  <div class="h-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'h-container'
};
</script>

<style lang="postcss" scoped>
.h-container {
  overflow: hidden;
  position: relative;
}
</style>
