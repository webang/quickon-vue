<template>
  <div class="body" v-if="showEditWidget">
    <!-- 编辑图片 -->
    <template v-if="curForm.name==='hsb-image'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.props)" :key="index">
        <template v-if="key==='url'">
          <div style="overflow: hidden">
            <span class="row-label">图片地址</span>
            <el-input class="row-value" v-model="curForm.props[key]"></el-input>
          </div>
          <uploader v-model="curForm.props[key]" />
        </template>
        <template v-if="key==='link'">
          <span class="row-label">跳转链接</span>
          <el-input class="row-value" v-model="curForm.props[key]"></el-input>
        </template>
      </div>
    </template>

    <!-- 编辑链接 -->
    <template v-if="curForm.name==='hsb-link'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.props)" :key="index">
        <template v-if="key==='link'">
          <span class="row-label">跳转链接</span>
          <el-input class="row-value" v-model="curForm.props[key]"></el-input>
        </template>
        <template v-if="key==='text'">
          <span class="row-label">文本内容</span>
          <el-input class="row-value" v-model="curForm.props[key]"></el-input>
        </template>
      </div>
    </template>

    <!-- 编辑热区 -->
    <template v-if="curForm.name==='hsb-click-area'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.props)" :key="index">
        <template v-if="key==='link'">
          <span class="row-label">跳转链接</span>
          <el-input class="row-value" v-model="curForm.props[key]" />
        </template>
        <template v-if="key==='url'">
          <span class="row-label">图片地址</span>
          <el-input class="row-value" v-model="curForm.props[key]" />
          <div>
            <img class="row-img" :src="curForm.props[key]" alt />
          </div>
        </template>
      </div>
    </template>

    <!-- 编辑优惠券 -->
    <template v-if="curForm.name==='hsb-coupon'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.props)" :key="index">
        <template v-if="key==='id'">
          <span class="row-label">券ID</span>
          <el-input class="row-value" v-model="curForm.props[key]"></el-input>
        </template>
        <template v-if="key==='url'">
          <span class="row-label">图片地址</span>
          <el-input class="row-value" v-model="curForm.props[key]"></el-input>
          <div>
            <img class="row-img" :src="curForm.props[key]" alt />
          </div>
        </template>
      </div>
    </template>

    <!-- 优惠券组 -->
    <template v-if="curForm.name==='hsb-coupon-list'">
      <div
        class="row coupon-list-prop"
        v-for="(key, index) in Object.keys(curForm.props)"
        :key="index"
      >
        <template v-if="key==='couponList'">
          <div class="coupon-item" v-for="(item, index) in curForm.props.couponList" :key="index">
            <div>
              <span class="row-label">券ID</span>
              <el-input class="row-value" v-model="item.id"></el-input>
              <el-button type="primary" plain @click="handleAddCoupon(index)">+</el-button>
              <el-button type="primary" plain @click="handleRemoveCoupon(index)">-</el-button>
            </div>
            <div style="margin-top: 20px">
              <span class="row-label">图片</span>
              <el-input class="row-value" v-model="item.url"></el-input>
              <div style="margin-bottom: 20px">
                <img class="row-img" :src="item.url" alt />
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- 多列 -->
    <template v-if="curForm.name==='hsb-column'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.props)" :key="index">
        <template v-if="key==='column'">
          <span class="row-label">设置列数</span>
          <el-slider class="row-value" v-model="curForm.props[key]" show-input :min="1" :max="4" />
        </template>
      </div>
    </template>

    <!-- 文本 -->
    <template v-if="curForm.name==='hsb-text'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.props)" :key="index">
        <template v-if="key==='text'">
          <span class="row-label">文本內容</span>
          <el-input class="row-value" v-model="curForm.props[key]" />
        </template>
      </div>
    </template>

    <!-- 公共属性 -->
    <div class="common-style">
      <div class="row">
        <span class="row-label">容器宽度</span>
        <input
          class="row-value deco-input"
          data-key="width"
          :value="styleObj.width"
          @input="handleStylePropChange"
        />
      </div>
      <div class="row">
        <span class="row-label">容器高度</span>
        <input
          class="row-value deco-input"
          data-key="height"
          :value="styleObj.height"
          @input="handleStylePropChange"
        />
      </div>
      <div class="row">
        <span class="row-label">顶部偏移</span>
        <input
          class="row-value deco-input"
          data-key="top"
          :value="styleObj.top"
          @input="handleStylePropChange"
        />
      </div>
      <div class="row">
        <span class="row-label">左侧偏移</span>
        <input
          class="row-value deco-input"
          data-key="left"
          :value="styleObj.left"
          @input="handleStylePropChange"
        />
      </div>
      <div class="row">
        <span class="row-label">右侧偏移</span>
        <input
          class="row-value deco-input"
          data-key="right"
          :value="styleObj.right"
          @input="handleStylePropChange"
        />
      </div>
      <div class="row">
        <span class="row-label">底部偏移</span>
        <input
          class="row-value deco-input"
          data-key="bottom"
          :value="styleObj.bottom"
          @input="handleStylePropChange"
        />
      </div>
      <div class="row">
        <span class="row-label">CSS代码</span>
        <textarea
          class="row-value row-textarea"
          rows="10"
          autosize
          placeholder
          type="textarea"
          :value="styleStr"
          @input="handleStyleChange"
        />
      </div>
    </div>
    <el-button class="close-edit-btn" type="primary" plain @click="handleClose">关闭编辑</el-button>
  </div>
</template>

<script>
import Utils from '../utils';
import { mapState } from 'vuex';
import Uploader from '../components/uploader';
import propsMap from '../../mobile/prop-map';

export default {
  components: {
    Uploader
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      styleStr: '',
      styleObj: {
        width: '',
        height: '',
        left: '',
        top: '',
        right: '',
        bottom: ''
      },
      oStyleObj: {},
      curForm: {}
    };
  },
  computed: {
    ...mapState({
      editKey: state => state.editKey,
      editForm: state => state.editForm,
      showEditWidget: state => state.showEditWidget
    })
  },
  watch: {
    editKey(val) {
      this.initEditData();
    },
    styleObj: {
      deep: true,
      handler(val) {
        const styleObj = {
          ...this.curForm.style,
          ...val
        };
        this.curForm.style = styleObj;
        // // 初始化 css 代码
        // this.styleStr = Object.keys(styleObj)
        //   .map(key => `${key}: ${styleObj[key]};`)
        //   .join('\n');
      }
    }
  },
  created() {
    this.initEditData();
    this.$watch('editForm', {
      deep: true,
      handler(val) {
        this.initEditData();
      }
    });
    this.$watch('curForm', {
      deep: true,
      handler(val) {
        this.$store.dispatch('handleEditForm', val);
      }
    });
    this.dialogVisible = this.value;
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    handleSliderChange(val) {
      console.log(val);
    },
    isNum(val) {
      if (val === '') {
        return false;
      }
      const num = Number(val);
      return !(num !== num);
    },
    // 输入 style 属性值
    handleStylePropChange(event) {
      const key = event.target.getAttribute('data-key');
      this.styleObj[key] = event.target.value;
      this.curForm.style = {
        ...this.curForm.style,
        ...this.styleObj
      };

      let curForm = this.curForm;
      let allStyle = {};
      let styleStr = '';

      // 初始化被提出来的属性 width height ...
      Object.keys(curForm.style).forEach(key => {
        allStyle[key] = curForm.style[key];
      });

      // 初始化 css 代码
      styleStr = Object.keys(allStyle)
        .filter(key => allStyle[key])
        .map(key => `${key}: ${allStyle[key]};`)
        .join('\n');

      this.styleStr = styleStr;
    },

    // 输入CSS代码
    handleStyleChange(event) {
      const obj = {};
      const val = event.target.value;
      const arr = val.replace(/\n/g, '').split(';');

      arr.forEach(element => {
        if (element.includes(':')) {
          const list = element.split(':');
          const key = Utils.trim(list[0]);
          const value = Utils.trim(list[1]);
          obj[key] = value;
        }
      });

      Object.keys(this.styleObj).forEach(key => {
        if (Utils.isDef(obj[key])) {
          this.styleObj[key] = obj[key];
        } else {
          this.styleObj[key] = '';
        }
      });

      this.styleStr = val;
      this.curForm.style = obj;
    },

    // 添加优惠券
    handleAddCoupon(index) {
      this.curForm.props.couponList.splice(index + 1, 0, {
        ...propsMap['hsb-coupon']
      });
    },

    // 删除优惠券
    handleRemoveCoupon(index) {
      this.curForm.props.couponList.splice(index, 1);
    },

    // 关闭弹窗
    handleClose() {
      this.$store.commit('setEditKey', '');
      this.$store.commit('setShowEditWidget', false);
    },

    // 初始化当前编辑的数据
    initEditData() {
      let curForm = JSON.parse(JSON.stringify(this.editForm));
      let styleStr = '';
      let oStyleObj = {};
      let styleObj = {
        width: '',
        height: '',
        left: '',
        top: ''
      };
      let allStyle = {};

      // 校验 style 属性
      if (!curForm.style) curForm.style = {};

      // 校验 props 属性
      if (!curForm.props) curForm.props = curForm.prop || {};

      // 初始化被提出来的属性 width height ...
      Object.keys(curForm.style).forEach(key => {
        allStyle[key] = curForm.style[key];
        if (Utils.isDef(styleObj[key])) {
          styleObj[key] = curForm.style[key];
        } else {
          oStyleObj[key] = curForm.style[key];
        }
      });

      // 初始化 css 代码
      styleStr = Object.keys(allStyle)
        .filter(key => allStyle[key])
        .map(key => `${key}: ${allStyle[key]};`)
        .join('\n');

      this.curForm = curForm;
      this.styleStr = styleStr;
      this.styleObj = styleObj;
      this.oStyleObj = oStyleObj;
    }
  }
};
</script>

<style lang="postcss" scoped>
.body {
  padding: 24px;
  padding-top: 10px;
  background: #fff;
}

.row {
  overflow: hidden;
  margin: 10px 0;
}

.row-label {
  float: left;
  margin: 10px 10px;
  margin-left: 0;
}

.row-value {
  float: left;
  width: 400px;
  border-radius: 2px;
}

.row-img {
  max-height: 120px;
  margin-top: 20px;
}

.close-edit-btn {
  margin-top: 20px;
}

.row-textarea {
  padding: 12px;
  box-sizing: border-box;
  outline: none;
  background: #fff;
  border: 1px solid #dcdfe6;
  &:focus {
    outline: 0;
    border-color: #409eff;
  }
}

.deco-input {
  padding: 0 12px;
  height: 40px;
  box-sizing: border-box;
  outline: none;
  background: #fff;
  border: 1px solid #dcdfe6;
  &:focus {
    outline: 0;
    border-color: #409eff;
  }
}
</style>
