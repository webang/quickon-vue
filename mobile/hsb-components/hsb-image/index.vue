<template>
  <img class="hsb-image" data-name="hsb-image" :src="url" @click="handleClick">
</template>

<script>
export default {
  props: {
    url: '',
    link: ''
  },
  methods: {
    handleClick () {
      if (this.link) {
        window.location.href = this.link
      }
    }
  }
}
</script>

<style lang="postcss" scoped>
.hsb-image {
  display: block;
  width: 100%;
}
</style>
