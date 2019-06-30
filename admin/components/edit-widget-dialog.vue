<template>
  <el-dialog title="设置组件属性" :visible="dialogVisible" width="1200px">
    <div class="body">
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
            <span class="row-label">调转链接</span>
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
          <el-input class="row-value" v-model="styleObj.width"></el-input>
        </div>
        <div class="row">
          <span class="row-label">容器高度</span>
          <el-input class="row-value" v-model="styleObj.height"></el-input>
        </div>
        <div class="row">
          <span class="row-label">左侧偏移</span>
          <el-input class="row-value" v-model="styleObj.left"></el-input>
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
      <el-button style="margin-top: 20px" @click="handleCancle">取 消</el-button>
      <el-button style="margin-top: 20px" @click="handleConfirm">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Utils from '../utils';
const styleKeys = ['width', 'height'];

export default {
  props: {
    dataForm: Object,
    value: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      formValue: {},
      styleObj: {
        width: '',
        height: '',
        left: '0px',
        top: '0px'
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
    styleObj () {
      this.handleConfirm()
    },
    formValue () {
      this.handleConfirm()
    },
    cssStr () {
      this.handleConfirm()
    }
  },
  created() {
    this.initFormValue();
    this.dialogVisible = this.value;
  },
  methods: {
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
      let formValue = JSON.stringify(this.dataForm);
      formValue = JSON.parse(formValue);
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
.row {
  margin: 10px 0;
}

.row-label {
  margin-right: 10px;
}

.row-value {
  width: 400px;
  border-radius: 2px;
}

.row-img {
  width: 468px;
  margin-top: 20px;
}
</style>
