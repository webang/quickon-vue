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
  float: left;
  display: block;
  width: 100%;
  border: 0;
}

img {
  display: block;
  width: 100%;
}
</style>
