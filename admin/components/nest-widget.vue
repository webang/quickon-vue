<style lang="postcss" scoped>
.item-container {
  max-width: 20rem;
  margin: 0;
  .btn {
    float: right;
    margin-left: 10px;
  }
}

.item {
  box-sizing: border-box;
  padding: 8px 10px;
  border-radius: 2px;
  line-height: 24px;
  margin: 10px 0;
  cursor: move;
  position: relative;
  background: #fafafa;
  border: 1px solid #d9d9d9;
}

.item-sub {
  margin-left: 20px;
}
</style>

<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="list"
    :value="value"
    @input="emitter"
  >
    <div class="item-group" :key="el.id" v-for="(el, index) in realValue">
      <div class="item">
        <span>{{ el.component }}</span>
        <el-button class="btn" size="mini" plain @click="handleRemove(el, index)">删除</el-button>
        <el-button class="btn" size="mini" plain @click="handleEdit(el, index)">编辑</el-button>
      </div>
      <nested-widget @edit-widget="handleEdit" class="item-sub" :list="el.child"/>
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "nested-widget",
  methods: {
    emitter(value) {
      this.$emit("input", value);
    },
    handleRemove(el, index) {
      this.realValue.splice(index, 1);
    },
    handleEdit(el, index) {
      this.$emit("edit-widget", el, index);
    }
  },
  components: {
    draggable
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    }
  },
  props: {
    value: {
      required: false,
      type: Array,
      default: null
    },
    list: {
      required: false,
      type: Array,
      default: null
    }
  }
};
</script>
