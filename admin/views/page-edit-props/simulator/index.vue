<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      pageData: state => state.cacheData,
      widget: state => state.cacheData.widget
    })
  },
  watch: {
    pageData(val) {
      document.title = val.title;
      document.getElementsByName('keywords')[0].content = val.name;
      document.getElementsByName('description')[0].content = val.desc;
    }
  },
  // created() {
  //   this.$store.dispatch('getPageData');
  // },
  render(createElement) {
    const widget = JSON.parse(JSON.stringify(this.widget));
    const vNodeList = [];

    /**
     * 校验css
     */
    const validStyle = element => {
      // 补充PX单位
      const usePxProperty = ['width', 'height', 'top', 'left'];
      element.style = element.style || {};
      Object.keys(element.style).forEach(key => {
        if (
          usePxProperty.includes(key) &&
          element.style[key]
          // element.style[key].indexOf('%') === -1
        ) {
          element.style[key] = parseFloat(element.style[key]) + 'px';
        }
      });
      return element.style;
    };

    /**
     * 加载组件
     */
    const loadComponent = (item, nodeList) => {
      const childList = [];
      if (item.child && item.child.length) {
        item.child.forEach(element => {
          loadComponent(element, childList);
        });
      }
      const cls = ['hsb-widget'];
      if (item.id === this.$store.state.editKey) {
        cls.push('is-debug');
      }
      const node = createElement(
        require(`../../../../mobile/h-components/${item.name}`).default,
        {
          style: validStyle(item),
          props: item.props || item.prop || {},
          class: cls
        },
        childList
      );
      // const widget = createElement(
      //   'div',
      // )
      nodeList.push(node);
    };

    widget.forEach(element => {
      loadComponent(element, vNodeList);
    });

    return createElement(
      'div',
      {
        class: 'hsb-deco-page'
      },
      vNodeList
    );
  }
};
</script>

<style lang="postcss" scoped>
.hsb-deco-page {
  position: relative;
  overflow-y: auto;
  width: 375px;
  height: 667px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #333;
}

.hsb-widget {
  position: relative;
  &::after {
    z-index: 2;
    position: absolute;
    content: ' ';
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.is-debug {
  border: 2px solid #409eff;
}
</style>