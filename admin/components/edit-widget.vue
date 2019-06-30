<template>
  <div class="body" v-if="value">
    <!-- 编辑图片 -->
    <template v-if="curForm.component==='hsb-image'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.prop)" :key="index">
        <template v-if="key==='url'">
          <span class="row-label">图片地址</span>
          <el-input class="row-value" v-model="curForm.prop[key]"></el-input>
          <div>
            <img class="row-img" :src="curForm.prop[key]" alt>
          </div>
        </template>
        <template v-if="key==='link'">
          <span class="row-label">跳转链接</span>
          <el-input class="row-value" v-model="curForm.prop[key]"></el-input>
        </template>
      </div>
    </template>

    <!-- 编辑链接 -->
    <template v-if="curForm.component==='hsb-link'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.prop)" :key="index">
        <template v-if="key==='link'">
          <span class="row-label">跳转链接</span>
          <el-input class="row-value" v-model="curForm.prop[key]"></el-input>
        </template>
        <template v-if="key==='text'">
          <span class="row-label">文本内容</span>
          <el-input class="row-value" v-model="curForm.prop[key]"></el-input>
        </template>
      </div>
    </template>

    <!-- 编辑链接 -->
    <template v-if="curForm.component==='hsb-click-area'">
      <div class="row" v-for="(key, index) in Object.keys(curForm.prop)" :key="index">
        <template v-if="key==='link'">
          <span class="row-label">跳转链接</span>
          <el-input class="row-value" v-model="curForm.prop[key]"></el-input>
        </template>
        <template v-if="key==='url'">
          <span class="row-label">图片地址{{ curForm.prop[key] }}</span>
          <el-input class="row-value" v-model="curForm.prop[key]"></el-input>
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
import { mapState } from 'vuex';

const _styleObj = {
  width: '',
  height: '',
  left: '',
  top: ''
};

export default {
  props: {
    value: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      curForm: {},
      styleObj: {
        ..._styleObj
      },
      cssStr: ''
    };
  },
  computed: {
    dataForm() {
      return this.$store.state.editForm;
    },
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
    dataForm(val) {
      this.curForm = val;
      this.initcurForm();
    },
    curForm: {
      deep: true,
      handler (val) {
        this.$emit('confirm', val);
      }
    }
    // value(val) {
    //   this.dialogVisible = val;
    // },
    // dialogVisible(val) {
    //   this.$emit('input', val);
    // },
    // styleObj: {
    //   handler() {
    //     this.handleConfirm();
    //   },
    //   deep: true
    // },
    // cssStr() {
    //   this.handleConfirm();
    // }
  },
  created() {
    this.initcurForm();
    this.$watch('curForm', {
      deep: true,
      handler(val) {
        console.log(val);
        // this.$store.commit('setCacheData', val);
        // console.log(val);
        // console.log(222)
        // this.handleConfirm()
      }
    });
    this.dialogVisible = this.value;
  },
  methods: {
    /**
     * @description 确认修改
     */
    handleConfirm() {
      // const obj = JSON.parse(JSON.stringify(this.curForm))
      const styleObj = {};
      Object.keys(this.styleObj).forEach(key => {
        if (Utils.isDef(this.styleObj[key])) {
          styleObj[key] = this.styleObj[key];
        }
      });
      Object.assign(styleObj, this.cssObj);
      this.curForm.style = styleObj;
      // this.dialogVisible = false;
      // this.$emit('confirm', this.curForm);
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
    initcurForm() {
      this.cssStr = '';
      this.styleObj = {
        ..._styleObj
      };
      let curForm = JSON.parse(JSON.stringify(this.dataForm));

      // 校验 style 属性
      if (!curForm.style) {
        curForm.style = {};
      }

      // 初始化被提出来的属性 width height ...
      // Object.keys(this.styleObj).forEach(key => {
      //   if (Utils.isDef(curForm.style[key])) {
      //     this.styleObj[key] = curForm.style[key];
      //   }
      // });

      // 初始化 css 代码
      // const cssStrList = [];
      // Object.keys(curForm.style).forEach(key => {
      //   if (!Utils.isDef(this.styleObj[key])) {
      //     cssStrList.push(`${key}: ${curForm.style[key]};`);
      //   }
      // });
      // this.cssStr = cssStrList.join('\n');
      this.curForm = curForm;
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
