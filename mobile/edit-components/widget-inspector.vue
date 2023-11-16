<template>
  <div class="widget-inspector" ref="inspector">
    <div
      class="widget-inspector-section hover-section"
      ref="hoverInspector"
      @click="handleHoverSectionClick"
      @mouseleave="handleSectionMouseLeave"
    ></div>

    <div
      class="widget-inspector-section selected-section"
      ref="selectInspector"
      @click="handleSelectSectionClick"
    ></div>

    <div class="widget-inspector-toolbar" ref="toolbar">
      <div class="widget-inspector-toolbar-inner">
        <img src="./img/arrow_up.svg" alt="" />
        <img src="./img/arrow_down.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store';
let hoverWidget = '';
let selectedWidget = '';

let hoverRect = null;
let scrollTop = 0;

function findParent (element) {
  if (element.classList.contains('hsb-widget')) {
    return element;
  }
  var ancestors = null;
  while (element.parentElement) {
    element = element.parentElement;
    if (element.classList.contains('hsb-widget')) {
      ancestors = element
      break;
    }
  }
  return ancestors
}

export default {
  mounted() {
    const widgets = document.querySelectorAll('.hsb-widget');
    widgets.forEach(it => {
      it.addEventListener('mouseover', e => {
        e.stopPropagation()
        const inspector = this.$refs.hoverInspector;
        scrollTop = document.documentElement.scrollTop;
        const rect = it.getBoundingClientRect();
        hoverRect = rect;
        inspector.style.left = rect.left + 'px';
        inspector.style.width = rect.width + 'px';
        inspector.style.height = rect.height + 'px';
        inspector.style.top = rect.top + scrollTop + 'px';
        hoverWidget = it.getAttribute('data-widget');
      });
    });

    const _this = this;

    window.addEventListener('click', function(e) {
      const t = findParent(e.target);
      if (t) {
        const id = t.getAttribute('data-widget')
        if (id !== selectedWidget) {
          store.commit('setEditKey', id)
          _this.selectWidget(id)
          e.stopPropagation()
          e.preventDefault()
        }
      }
    }, true)
  },

  methods: {
    selectWidget (id) {
      selectedWidget = id;
      const element = document.querySelector('[data-widget="' + id + '"]')
      const rect = element.getBoundingClientRect();
      const inspector = this.$refs.selectInspector;
      inspector.style.left = rect.left + 'px';
      inspector.style.width = rect.width + 'px';
      inspector.style.height = rect.height + 'px';
      inspector.style.top = rect.top + scrollTop + 'px';
      this.$refs.toolbar.style.top = rect.top + rect.height + 'px';
    },

    handleHoverSectionClick(e) {
      e.stopPropagation()
      this.selectWidget(hoverWidget)
    },

    handleSelectSectionClick(e) {
      e.stopPropagation()
      const inspector = this.$refs.selectInspector;
      const rect = hoverRect;
      inspector.style.left = rect.left + 'px';
      inspector.style.width = rect.width + 'px';
      inspector.style.height = rect.height + 'px';
      inspector.style.top = rect.top + scrollTop + 'px';
      this.$refs.toolbar.style.top = rect.top + rect.height + 'px';
    },

    handleSectionMouseLeave(e) {
      // console.log(e)
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

<style lang="postcss">
.widget-inspector-section {
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
  border: 2px solid #1274ff;
  pointer-events: none;
}

.widget-inspector-toolbar {
  position: fixed;
  left: 50%;
  width: 100px;
  margin-left: -50px;
  margin-top: 10px;
  text-align: center;
  border-radius: 10px;
  .widget-inspector-toolbar-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .8);
  }
  img {
    width: 16px;
    height: 16px;
    cursor: pointer;
    margin: 0 6px;
  }
}

.hsb-widget {
}
</style>
