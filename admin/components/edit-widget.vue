<template>
  <div class="body" v-if="showEditWidget">
    <!-- 编辑图片 -->
    <template v-if="curForm.component==='hsb-image'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.props)" :key="index">
        <template v-if="key==='url'">
          <span class="row-label">图片地址</span>
          <el-input class="row-value" v-model="curForm.props[key]"></el-input>
          <div>
            <img class="row-img" :src="curForm.props[key]" alt>
          </div>
        </template>
        <template v-if="key==='link'">
          <span class="row-label">跳转链接</span>
          <el-input class="row-value" v-model="curForm.props[key]"></el-input>
        </template>
      </div>
    </template>

    <!-- 编辑链接 -->
    <template v-if="curForm.component==='hsb-link'">
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
    <template v-if="curForm.component==='hsb-click-area'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.props)" :key="index">
        <template v-if="key==='link'">
          <span class="row-label">跳转链接</span>
          <el-input class="row-value" v-model="curForm.props[key]"/>
        </template>
        <template v-if="key==='url'">
          <span class="row-label">图片地址</span>
          <el-input class="row-value" v-model="curForm.props[key]"/>
          <div>
            <img class="row-img" :src="curForm.props[key]" alt>
          </div>
        </template>
      </div>
    </template>

    <!-- 编辑优惠券 -->
    <template v-if="curForm.component==='hsb-coupon'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.props)" :key="index">
        <template v-if="key==='id'">
          <span class="row-label">券ID</span>
          <el-input class="row-value" v-model="curForm.props[key]"></el-input>
        </template>
        <template v-if="key==='url'">
          <span class="row-label">图片地址</span>
          <el-input class="row-value" v-model="curForm.props[key]"></el-input>
          <div>
            <img class="row-img" :src="curForm.props[key]" alt>
          </div>
        </template>
      </div>
    </template>

    <!-- 优惠券组 -->
    <template v-if="curForm.component==='hsb-coupon-list'">
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
                <img class="row-img" :src="item.url" alt>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- 公共属性 -->
    <div class="common-style">
      <div class="row">
        <span class="row-label">容器宽度</span>
        <!-- <el-slider
          class="row-value"
          v-model="styleObj.width"
          show-input
          :min="0"
          :max="750"
        />
        <el-button @click="styleObj.width=''" type="primary" plain size="mini">自适应</el-button>-->
        <el-input class="row-value" v-model="styleObj.width"/>
      </div>
      <div class="row">
        <span class="row-label">容器高度</span>
        <el-input class="row-value" v-model="styleObj.height"/>
        <!-- <el-slider class="row-value" v-model="styleObj.height" show-input :min="0" :max="750"/>
        <el-button @click="styleObj.height=''" type="primary" plain size="mini">自适应</el-button>-->
      </div>
      <div class="row">
        <span class="row-label">左侧偏移</span>
        <el-input class="row-value" v-model="styleObj.left"/>
      </div>
      <div class="row">
        <span class="row-label">顶部偏移</span>
        <el-input class="row-value" v-model="styleObj.top"></el-input>
      </div>
      <div class="row">
        <span class="row-label">CSS代码</span>
        <el-input
          class="row-value row-textarea"
          autosize
          placeholder
          type="textarea"
          v-model="styleStr"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '../utils';
import { mapState } from 'vuex';
import propsMap from '../../mobile/prop-map';

export default {
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
        top: ''
      },
      curForm: {}
    };
  },
  computed: {
    ...mapState({
      editKey: state => state.editKey,
      editForm: state => state.editForm,
      showEditWidget: state => state.showEditWidget
      // styleObj: state => state.styleObj
      // styleStr: state => state.styleStr
    })
    // cssObj(val) {

    // }
  },
  watch: {
    editKey(val) {
      this.initEditData();
    },
    styleObj: {
      deep: true,
      handler(val) {
        Object.assign(this.curForm.style, {
          ...val
        });
        this.$store.dispatch('handleEditForm', this.curForm);
      }
    }
  },
  created() {
    this.initEditData();
    this.$watch('curForm', {
      deep: true,
      handler(val) {
        this.$store.dispatch('handleEditForm', val);
      }
    });
    this.$watch('styleStr', val => {
      const obj = {};
      const arr = val.replace(/\n/g, '').split(';');
      arr.forEach(element => {
        if (element.includes(':')) {
          const list = element.split(':');
          const key = Utils.trim(list[0]);
          const value = Utils.trim(list[1]);
          obj[key] = value;
        }
      });
      Object.assign(this.curForm.style, {
        ...obj
      });
      Object.keys(obj).forEach(key => {
        if (Utils.isDef(this.styleObj[key])) {
          this.styleObj[key] = obj[key];
        }
      });
      this.$store.dispatch('handleEditForm', this.curForm);
    });
    this.dialogVisible = this.value;
  },
  methods: {
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

    /**
     * @description 关闭弹窗
     */
    handleCancle() {
      this.dialogVisible = false;
    },

    /**
     * @description 初始化当前编辑的数据
     */
    initEditData() {
      console.log('initEditData');
      const curForm = this.editForm;

      this.styleStr = '';
      this.styleObj = {
        width: '',
        height: '',
        left: '',
        top: ''
      };

      // 校验 style 属性
      if (!curForm.style) {
        curForm.style = {};
      }

      // 校验 props 属性
      if (!curForm.props) {
        curForm.props = curForm.prop || {};
      }

      // 初始化被提出来的属性 width height ...
      Object.keys(this.styleObj).forEach(key => {
        if (Utils.isDef(curForm.style[key])) {
          this.styleObj[key] = curForm.style[key];
        }
      });

      // 初始化 css 代码
      const cssStrList = [];
      Object.keys(curForm.style).forEach(key => {
        if (!Utils.isDef(this.styleObj[key])) {
          cssStrList.push(`${key}: ${curForm.style[key]};`);
        }
      });
      this.cssStr = cssStrList.join('\n');
      this.curForm = curForm;
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
  width: 400px;
  border-radius: 2px;
}

.row-img {
  max-height: 120px;
  margin-top: 20px;
}

/* 优惠券列表 */
.coupon-list-prop {
}
</style>
