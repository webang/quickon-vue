<template>
  <div class="body" v-if="value">
    <!-- 编辑图片 -->
    <template v-if="formValue.component==='hsb-image'">
      <div class="row" v-for="(key, index) in Object.keys(formValue.prop)" :key="index">
        <template v-if="key==='url'">
          <span class="row-label">图片地址</span>
          <el-input class="row-value" v-model="formValue.prop[key]"></el-input>
          <div>
            <img class="row-img" :src="formValue.prop[key]" alt>
          </div>
        </template>
        <template v-if="key==='link'">
          <span class="row-label">跳转链接</span>
          <el-input class="row-value" v-model="formValue.prop[key]"></el-input>
        </template>
      </div>
    </template>

    <!-- 编辑链接 -->
    <template v-if="formValue.component==='hsb-link'">
      <div class="row" v-for="(key, index) in Object.keys(formValue.prop)" :key="index">
        <template v-if="key==='link'">
          <span class="row-label">调转链接</span>
          <el-input class="row-value" v-model="formValue.prop[key]"></el-input>
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
          v-model="cssStr"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Utils from '../utils';
const styleKeys = ['width', 'height'];
export default {
  props: {
    value: Boolean,
    dataForm: Object
  },
  data() {
    return {
      dialogVisible: false,
      formValue: {},
      styleObj: {
        width: '',
        height: '',
        left: '0',
        top: '0'
      },
      cssStr: ''
    };
  },
  computed: {
    cssObj(val) {
      const styleObj = {};
      const arr = this.cssStr.replace(/\n/g, '').split(';');
      arr.forEach(element => {
        if (element.includes(':')) {
          const list = element.split(':');
          const key = Utils.trim(list[0]);
          const value = Utils.trim(list[1]);
          styleObj[key] = value;
        }
      });
      return styleObj;
    }
  },
  watch: {
    value(val) {
      this.dialogVisible = val;
    },
    dialogVisible(val) {
      this.$emit('input', val);
    },
    dataForm() {
      this.initFormValue();
    },
    // formValue: {
    //   handler() {
    //     this.handleConfirm();
    //   },
    //   deep: true
    // },
    styleObj: {
      handler() {
        this.handleConfirm();
      },
      deep: true
    },
    cssStr() {
      this.handleConfirm();
    }
  },
  created() {
    this.initFormValue();
    this.dialogVisible = this.value;
  },
  methods: {
    handleSliderInput(val) {
      if (val !== 0) {
        this.styleObj.width = val;
      } else {
        this.styleObj.width = '';
      }
    },

    /**
     * 确认修改
     */
    handleConfirm() {
      const styleObj = {};
      Object.keys(this.styleObj).forEach(key => {
        if (Utils.isDef(this.styleObj[key])) {
          styleObj[key] = this.styleObj[key];
        }
      });
      Object.assign(styleObj, this.cssObj);
      this.formValue.style = styleObj;
      // this.dialogVisible = false;
      this.$emit('confirm', this.formValue);
    },

    /**
     * 关闭弹窗
     */
    handleCancle() {
      this.dialogVisible = false;
    },

    /**
     * 初始化当前编辑的数据
     */
    initFormValue() {
      // let formValue = JSON.stringify(this.dataForm);
      // formValue = JSON.parse(formValue);
      let formValue = this.dataForm;
      if (!formValue.style) {
        formValue.style = {};
      }

      // 初始化被提出来的样式 width height ...
      Object.keys(this.styleObj).forEach(key => {
        if (Utils.isDef(formValue.style[key])) {
          this.styleObj[key] = formValue.style[key];
        }
      });

      // 初始化 css代码
      const cssStrList = [];
      Object.keys(formValue.style).forEach(key => {
        if (!Utils.isDef(this.styleObj[key])) {
          cssStrList.push(`${key}: ${formValue.style[key]};`);
        }
      });
      this.cssStr = cssStrList.join('\n');
      this.formValue = formValue;
    }
  }
};
</script>

<style lang="postcss" scoped>
.body {
  flex: 1;
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
  max-width: 468px;
  max-height: 300px;
  margin-top: 20px;
}
</style>
