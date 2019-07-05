<template>
  <div class="sidebar">
    <div class="sidebar__menu-group" v-for="(menu, index) in group" :key="index">
      <div class="sidebar__menu-title">{{ menu.title }}</div>
      <div class="sidebar__menu-list">
        <div
          class="sidebar__menu-item"
          :class="{'is-active': item.name === activeIndex}"
          v-for="(item, index) in menu.child"
          :key="index"
          draggable="true"
          @click="activeIndex=item.name"
        >
          <i class="sidebar__menu-item-icon" :class="item.icon"></i>
          <div class="sidebar__menu-item-text">{{ item.label }}</div>
        </div>
      </div>
    </div>
    <el-button class="btn-add" :disabled="!activeIndex" @click="handleAdd" plain type="primary">添加组件</el-button>
  </div>
</template>

<script>
import propMap from '../../../../mobile/prop-map';
import widgetMenu from '../../../../mobile/widget-menu';

export default {
  data() {
    return {
      activeIndex: '',
      group: widgetMenu.menu
    };
  },
  methods: {
    handleAdd() {
      const component = this.activeIndex;
      const data = {
        name: component,
        props: {
          ...propMap[component]
        },
        style: {}
      };
      // 配置哪些组件可以嵌套子组件
      const hasChildList = ['hsb-container', 'hsb-column'];
      if (hasChildList.includes(component)) {
        data.child = [];
      }
      this.$emit('add-widget', data);
    }
  }
};
</script>

<style lang="postcss" scoped>
.sidebar {
  position: fixed;
  left: 0;
  top: 60px;
  width: 240px;
  height: 100%;
  border-right: 1px solid #e8e8e8;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  box-sizing: border-box;
  overflow-y: auto;
  background: #fff;
  &__menu-title {
    line-height: 40px;
  }
  &__menu-item {
    float: left;
    width: 50%;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
    border: 1px solid #fff;
    background: #f4f4f4;
    box-sizing: border-box;
    &.is-active {
      border-color: #409eff;
    }
    cursor: pointer;
  }
  &__menu-list {
    overflow: hidden;
  }
  &__menu-item-icon {
    font-size: 30px;
    color: #409eff;
  }
  &__menu-item-text {
    font-size: 12px;
  }
}

.btn-add {
  margin-top: 20px;
}
</style>
