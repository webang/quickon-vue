<script>
import { mapState } from 'vuex';
import WidgetWrapper from '../../tool-components/widget-wrapper';
import WidgetShadow from '../../tool-components/widget-shadow';

export default {
  computed: {
    ...mapState({
      pageData: state => state.pageData,
      widget: state => state.pageData.widget
    })
  },
  watch: {
    pageData(val) {
      document.title = val.title;
      document.getElementsByName('keywords')[0].content = val.name;
      document.getElementsByName('description')[0].content = val.desc;
    }
  },
  created() {
    this.$store.dispatch('getPageData');
  },
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
      const cls = ['h-widget'];
      if (item.id === this.$store.state.editKey) {
        cls.push('is-debug');
      }
      const node = createElement(
        require(`../../h-components/${item.name}`).default,
        {
          style: validStyle(item),
          props: item.props || item.prop || {},
          class: cls,
          attrs: {
            'data-widget': item.id
          }
        },
        childList
      );
      const shadow = createElement(WidgetShadow);
      const wrapper = createElement(WidgetWrapper, [node, shadow]);
      nodeList.push(wrapper);
    };

    widget.forEach(element => {
      loadComponent(element, vNodeList);
    });

    return createElement(
      'div',
      {
        class: 'h-deco-page',
        attrs: {
          id: 'root',
          'data-pageId': 'demo'
        }
      },
      vNodeList
    );
  }
};
</script>

<style lang="postcss" scoped>
.h-deco-page {
  position: relative;
}

.is-debug {
  box-sizing: border-box;
  cursor: all-scroll;
  border: 2px solid #409eff;
}
</style>
