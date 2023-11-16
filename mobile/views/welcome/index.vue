<script>
import { mapState } from 'vuex';
import WidgetWrapper from '../../edit-components/widget-wrapper.vue';
import WidgetInspector from '../../edit-components/widget-inspector.vue'
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
  mounted () {
    const sections = document.querySelectorAll(".hsb-widget");
    sections.forEach((it) => {
      it.addEventListener('mouseover', () => {

      })
    })
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
      const cls = ['hsb-widget'];
      // if (item.id === this.$store.state.editKey) {
      //   cls.push('is-debug');
      // }

      const node = createElement(
        require(`../../hsb-components/${item.name}`).default,
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


      nodeList.push(node);
    };

    widget.forEach(element => {
      loadComponent(element, vNodeList);
    });

    const wrapper = createElement(WidgetInspector, {
        // attrs: {
        //     'data-widget': item.id
        //   }
      }, []);

    vNodeList.push(wrapper)

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
.hsb-deco-page {
  position: relative;
}

.is-debug {
  box-sizing: border-box;
  cursor: all-scroll;
  border: 2px solid #409eff;
}
</style>
