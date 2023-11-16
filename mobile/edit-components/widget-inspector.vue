<template>
  <div class="widget-inspector" ref="inspector">
    <div class="widget-inspector-section" ref="hoverInspector" @click="handleSectionClick" @mouseleave="handleSectionMouseLeave"></div>
    <div class="widget-inspector-section" ref="selectInspector" @click="handleSectionClick"></div>
  </div>
</template>

<script>
let hoverWidget = '';
let hoverRect = null;
let scrollTop = 0;

export default {
  mounted() {
    const widgets = document.querySelectorAll('.hsb-widget');

    document.documentElement.addEventListener('mouseleave', () => {
      console.log(`mouseleave`, e)
    })

    widgets.forEach(it => {
      it.addEventListener('mouseover', () => {
        const inspector = this.$refs.hoverInspector;
        scrollTop = document.documentElement.scrollTop
        const rect = it.getBoundingClientRect()
        hoverRect = rect;
        inspector.style.left = rect.left + 'px';
        inspector.style.width = rect.width + 'px';
        inspector.style.height = rect.height + 'px';
        inspector.style.top = rect.top + scrollTop + 'px';
        hoverWidget = it.getAttribute('data-widget')
      });
    });
  },
  methods: {
    handleSectionClick() {
      const inspector = this.$refs.selectInspector;
      const rect = hoverRect;
      inspector.style.left = rect.left + 'px';
      inspector.style.width = rect.width + 'px';
      inspector.style.height = rect.height + 'px';
      inspector.style.top = rect.top + scrollTop + 'px';
    },
    handleSectionMouseLeave (e) {
      console.log(e)
      //   const inspector = this.$refs.hoverInspector;
      //   if (inspector) {
      //     inspector.style.left = 0 + 'px';
      //     inspector.style.width = 0 + 'px';
      //     inspector.style.height = 0 + 'px';
      //     inspector.style.top = 0 + 'px';
      //   }
      // });
    }
  }
};
</script>

<style>
.widget-inspector-section {
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  border: 2px solid #333;
}
</style>