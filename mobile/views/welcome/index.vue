<script>
import { mapState } from 'vuex';
export default {
  computed: {
    ...mapState({
      widget: state => state.pageData.widget
    })
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
          element.style[key] &&
          element.style[key].indexOf('%') === -1
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
      const cls = ['hsb-widget']
      if (item.id === this.$store.state.editKey) {
        cls.push('is-debug')
      }
      const node = createElement(
        require(`../../hsb-components/${item.component}`).default,
        {
          style: validStyle(item),
          props: item.props || item.prop || {},
          class: cls
        },
        childList
      );
      nodeList.push(node);
    };

    widget.forEach(element => {
      loadComponent(element, vNodeList);
    });

    return createElement(
      'div',
      {
        class: 'hsb-deco-page',
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
.is-debug {
  padding: 10px 0;
  background: red;
}
</style>