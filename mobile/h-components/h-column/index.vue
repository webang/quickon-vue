<template>
  <div class="h-column" :class="['h-column-'+column]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'h-column',
  props: {
    column: {
      type: [Number, String],
      default: 2
    }
  }
};
</script>

<style lang="postcss" scoped>
.h-column {
  position: relative;
  overflow: hidden;
}

.h-column-2 {
  /deep/ > * {
    float: left;
    width: 50%;
  }
}

.h-column-3 {
  /deep/ > * {
    float: left;
    width: 33.3333%;
  }
}

.h-column-4 {
  /deep/ > * {
    float: left;
    width: 25%;
  }
}
</style>
