<template>
  <div class="hsb-column" :class="['hsb-column-'+column]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'hsb-column',
  props: {
    column: {
      type: [Number, String],
      default: 2
    }
  }
};
</script>

<style lang="postcss" scoped>
.hsb-column {
  position: relative;
  overflow: hidden;
}

.hsb-column-2 {
  /deep/ > * {
    float: left;
    width: 50%;
  }
}

.hsb-column-3 {
  /deep/ > * {
    float: left;
    width: 33.3333%;
  }
}

.hsb-column-4 {
  /deep/ > * {
    float: left;
    width: 25%;
  }
}
</style>
