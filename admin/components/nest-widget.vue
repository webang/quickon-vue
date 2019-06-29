<style lang="postcss" scoped>
.item-container {
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
        <span>{{ nameMap[el.component] }}</span>
        <span>{{ el.id }}</span>
        <el-button
          class="btn"
          size="mini"
          plain
          @click="handleRemove(el, index)"
          :data-index="parentIndex+'-'+index"
        >删除</el-button>
        <el-button
          class="btn"
          size="mini"
          plain
          @click="handleEdit(el, index)"
          :data-index="parentIndex+'-'+index"
        >编辑</el-button>
      </div>
      <nested-widget
        @edit-widget="handleEdit"
        class="item-sub"
        :list="el.child"
        :parent-index="index"
      />
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';
import nameMap from '../../mobile/name-map';

export default {
  name: 'nested-widget',
  components: {
    draggable
  },
  methods: {
    emitter(value) {
      this.$emit('input', value);
    },
    handleRemove(el, index) {
      this.realValue.splice(index, 1);
    },
    handleEdit(el, index) {
      this.$emit('edit-widget', el, index);
    }
  },
  data() {
    return {
      nameMap
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    },
    // this.value when input = v-model
    // this.list  when input != v-model
    realValue() {
      return this.value ? this.value : this.list;
    }
  },
  props: {
    'parent-index': {
      type: [Number, String]
    },
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
