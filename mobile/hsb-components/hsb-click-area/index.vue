<template>
  <div class="hsb-click-area" @click="handleClick">
    <img v-if="url" :src="url" alt />
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
  },
  methods: {
    handleClick() {
      if (this.link) {
        window.location.href = this.link;
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.hsb-click-area {
  z-index: 5;
  position: absolute;
  width: 50px;
  height: 50px;
}
</style>
