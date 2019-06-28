<template>
  <el-dialog title="选择您要添加的组件" :visible.sync="value">
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
import propMap from "../../mobile/prop-map";
import nameMap from "../../mobile/name-map";

export default {
  props: {
    value: Boolean
  },
  watch: {
    value(val) {
      this.centerDialogVisible = val;
    },
    centerDialogVisible(val) {
      this.$emit("input", val);
    }
  },
  data() {
    return {
      activeIndex: -1,
      centerDialogVisible: false,
      labelList: Object.keys(nameMap),
      nameList: Object.values(nameMap)
    };
  },
  methods: {
    handleConfirm() {
      const component = this.labelList[this.activeIndex];
      const data = {
        component,
        prop: {
          ...propMap[component]
        },
        child: []
      };
      this.$emit("confirm", data);
      this.$emit("input", false);
      this.resetIndex();
    },
    handleCancle() {
      this.resetIndex();
      this.$emit("input", false);
    },
    handleClick(index) {
      this.activeIndex = index;
    },
    resetIndex() {
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
