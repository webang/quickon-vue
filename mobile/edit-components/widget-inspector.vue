<template>
  <div class="widget-inspector" ref="inspector">
    <div class="widget-shadow"></div>
  </div>
</template>

<script>
export default {
  mounted() {
    const inspector = this.$refs.inspector;
    const widgets = document.querySelectorAll('.hsb-widget');
    widgets.forEach(it => {
      it.addEventListener('mouseover', () => {
        const scrollTop = document.documentElement.scrollTop
        const rect = it.getBoundingClientRect()
        console.log(rect)
        inspector.style.left = rect.left + 'px';
        inspector.style.width = rect.width + 'px';
        inspector.style.height = rect.height + 'px';
        inspector.style.top = rect.top + scrollTop + 'px';
      });
    });
  }
};
</script>

<style>
.widget-inspector {
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  border: 2px solid #333;
}
</style>