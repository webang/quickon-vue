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
  padding: 10px 10px;
  border-radius: 2px;
  line-height: 24px;
  cursor: move;
  position: relative;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  margin-bottom: 10px;
  &.is-active {
    color: #fff;
    background: #409EFF;
  }
  &:hover {
    box-shadow: 0 1px 4px 0 rgba(0,0,0,.15);
  }
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
    v-model="value"
    @input="emitter"
  >
    <div class="item-group" :key="el.id" v-for="(el, index) in realValue">
      <div class="item" :class="{'is-active': el.id === editKey}">
        <span>{{ nameMap[el.name] }}</span>
        <span>{{ el.id.substr(0, 10) }}</span>
        <el-button class="btn" size="mini" plain @click="handleRemove(el, index)">删除</el-button>
        <el-button class="btn" size="mini" plain @click.native="handleEdit(el, index)">编辑</el-button>
      </div>
      <template v-if="el.child">
        <nested-widget @edit-widget="handleEdit" class="item-sub" :list="el.child"/>
      </template>
    </div>
  </draggable>
</template>

<script>
import { mapState } from 'vuex';
import draggable from 'vuedraggable';
import widgetMenu from '../../../mobile/widget-menu';

export default {
  name: 'nested-widget',
  
  components: {
    draggable
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
  },

  data() {
    return {
      nameMap: widgetMenu.widgetLabel
    };
  },

  computed: {
    ...mapState({
      editKey: state => state.editKey
    }),
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

  methods: {
    emitter(value) {
      this.$emit('input', value);
    },
    handleRemove(el, index) {
      this.realValue.splice(index, 1);
    },
    handleEdit(el, index) {
      this.$store.dispatch('handleEdit', {
        editForm: el,
        editKey: el.id
      })
    }
  }
};
</script>
