<template>
  <el-dialog title="选择您要添加的组件" :visible="visible">
    <div class="body">
      <ul class="material-list">
        <li
          class="material-item"
          v-for="(item, index) in labelList"
          :key="item"
          @click="handleClick(index)"
          :class="{'is-active': activeIndex===index}"
        >
          <span>{{ nameList[index] }}</span>
        </li>
      </ul>
      <el-button class="btn" type="primary" @click="handleCancle">取 消</el-button>
      <el-button class="btn" type="primary" :disabled="activeIndex===-1" @click="handleConfirm">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
/**
 * @documention 添加组件弹窗
 */
import propMap from '../../mobile/prop-map';
import nameMap from '../../mobile/name-map';

export default {
  props: {
    value: Boolean
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit('input', val);
      this.resetData();
    }
  },
  data() {
    return {
      activeIndex: -1,
      visible: false,
      labelList: Object.keys(nameMap),
      nameList: Object.values(nameMap)
    };
  },
  methods: {
    /**
     * 确认添加
     */
    handleConfirm() {
      const component = this.labelList[this.activeIndex];
      const data = {
        component,
        props: {
          ...propMap[component]
        }
      };
      // 配置哪些组件可以嵌套子组件
      const hasChildList = [
        'hsb-container',
        'hsb-column',
      ]
      if (hasChildList.includes(component)) {
        data.child = [];
      }
      this.$emit('confirm', data);
      this.$emit('input', false);
    },

    /**
     * 取消
     */
    handleCancle() {
      this.$emit('input', false);
    },
    
    /**
     * 点击组件
     */
    handleClick(index) {
      this.activeIndex = index;
    },

    /**
     * 重置组件数据
     */
    resetData() {
      this.activeIndex = -1;
    }
  }
};
</script>

<style lang="postcss" scoped>
.material-list {
  overflow: hidden;
}

.material-item {
  float: left;
  width: 200px;
  height: 40px;
  line-height: 40px;
  margin-right: 10px;
  margin-bottom: 10px;
  text-align: center;
  cursor: pointer;
  background: #f0f9eb;
  border: 1px solid #c2e7b0;
  &.is-active {
    border: 1px solid #67c23a;
    color: #fff;
    background: #67c23a;
  }
}

.btn {
  margin-top: 20px;
}
</style>
