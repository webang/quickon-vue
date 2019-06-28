<template>
  <el-dialog title="设置组件属性" :visible.sync="centerDialogVisible" width="1200px">
    <div class="body">
      <!-- 编辑图片 -->
      <template v-if="curForm.component==='hsb-image'">
        <div class="row" v-for="(key, index) in Object.keys(curForm.prop)" :key="index">
          <template v-if="key==='url'">
            <span class="row-label">图片地址</span>
            <el-input class="row-value" v-model="curForm.prop[key]"></el-input>
            <div>
              <img style="margin-top: 20px" :src="curForm.prop[key]" alt>
            </div>
          </template>
          <template v-if="key==='link'">
            <span class="row-label">调转链接</span>
            <el-input class="row-value" v-model="curForm.prop[key]"></el-input>
          </template>
        </div>
      </template>

      <!-- 编辑链接 -->
      <template v-if="curForm.component==='hsb-link'">
        <div class="row" v-for="(key, index) in Object.keys(curForm.prop)" :key="index">
          <template v-if="key==='link'">
            <span class="row-label">调转链接</span>
            <el-input class="row-value" v-model="curForm.prop[key]"></el-input>
          </template>
        </div>
      </template>

      <!-- 公共属性 -->
      <div class="common-style">
        <div class="row">
          <span class="row-label">容器宽度</span>
          <el-input class="row-value" v-model="style.width"></el-input>
        </div>
        <div class="row">
          <span class="row-label">容器高度</span>
          <el-input class="row-value" v-model="style.height"></el-input>
        </div>
      </div>

      <el-button style="margin-top: 20px" @click="handleCancle">取 消</el-button>
      <el-button style="margin-top: 20px" @click="handleConfirm">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dataForm: Object,
    value: Boolean
  },
  data() {
    return {
      centerDialogVisible: false,
      curForm: {},
      style: {
        width: "",
        height: ""
      }
    };
  },
  watch: {
    value(val) {
      this.centerDialogVisible = val;
    },
    centerDialogVisible(val) {
      this.$emit("input", val);
    }
  },
  created() {
    if (this.dataForm) {
      this.initForm();
    }
    this.centerDialogVisible = this.value;
  },
  methods: {
    handleConfirm() {
      this.centerDialogVisible = false;
      this.$emit("confirm", this.curForm);
    },
    handleCancle() {
      this.centerDialogVisible = false;
    },
    initForm() {
      let form = JSON.stringify(this.dataForm);
      form = JSON.parse(form);
      this.curForm = form;
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
</style>
