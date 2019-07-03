<template>
  <div class="hsb-image">
    <a :href="link" v-if="link">
      <img :src="url">
    </a>
    <img v-else :src="url">
  </div>
</template>

<script>
export default {
  name: 'hsb-image',
  props: {
    url: '',
    link: ''
  }
};
</script>

<style lang="postcss" scoped>
.hsb-image {
  overflow: hidden;
  display: block;
}

a {
  display: block;
  height: 100%;
  width: 100%;
}

img {
  display: block;
  width: 100%;
}
</style>
