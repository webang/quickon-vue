<template>
  <div ref="box" class="hsb-click-area" @click="handleClick" :style="stl">
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
  data() {
    return {
      top: 10,
      left: 0
    };
  },
  computed: {
    stl() {
      return {
        top: this.top + 'px',
        left: this.left + 'px'
      };
    }
  },
  methods: {
    handleClick() {
      if (this.link) {
        window.location.href = this.link;
      }
    },
    handleTouchStart(event) {
      const box = this.$refs.box;
      const w = box.offsetWidth;
      const h = box.offsetHeight;
      console.log(w, h);
      const { clientX, clientY } = event;

      this.tsX = clientX;
      this.tsY = clientY;
      this.touched = true;
    },
    handleTouchMove(event) {
      if (!this.touched) {
        return;
      }
      const { clientX, clientY } = event;
      const deltaX = clientX - this.tsX;
      const deltaY = clientY - this.tsY;

      this.top = deltaY + this.top;
      this.left = deltaX + this.left;

      this.tsX = clientX;
      this.tsY = clientY;
    },
    handleTouchEnd(event) {
      this.touched = false;
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

img {
  display: block;
  width: 100%;
}
</style>
