<template>
  <el-dialog title="提示" :visible.sync="centerDialogVisible" width="1400px" center>
    <div class="body">
      <!-- 编辑图片 -->
      <template v-if="curForm.component==='hsb-image'">
        <div v-for="(key, index) in Object.keys(curForm.prop)" :key="index">
          <template v-if="key==='url'">
            <div class="etc-label">图片链接</div>
            <el-input class="edit-input" v-model="curForm.prop[key]"></el-input>
            <img style="margin-top: 20px" :src="curForm.prop[key]" alt>
          </template>
          <template v-if="key==='link'">
            <div class="etc-label" style="margin-top: 10px">点击调转链接</div>
            <el-input class="edit-input" v-model="curForm.prop[key]"></el-input>
          </template>
        </div>
        <el-button style="margin-top: 20px" @click="handleCancle">取 消</el-button>
        <el-button style="margin-top: 20px" @click="handleConfirm">保存</el-button>
      </template>
      <!-- 编辑链接 -->
      <template v-if="curForm.component==='hsb-link'">
        <div v-for="(key, index) in Object.keys(curForm.prop)" :key="index">
          <template v-if="key==='link'">
            <div class="etc-label" style="margin-top: 10px">设置链接</div>
            <el-input class="edit-input" v-model="curForm.prop[key]"></el-input>
          </template>
        </div>
        <el-button style="margin-top: 20px" @click="handleCancle">取 消</el-button>
        <el-button style="margin-top: 20px" @click="handleConfirm">保存</el-button>
      </template>
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
      curForm: {}
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
    let form = JSON.stringify(this.dataForm);
    form = JSON.parse(form);
    this.curForm = form;
    this.centerDialogVisible = this.value;
  },
  methods: {
    handleConfirm() {
      this.centerDialogVisible = false;
      this.$emit("confirm", this.curForm);
    },
    handleCancle() {
      this.centerDialogVisible = false;
    }
  }
};
</script>

<style lang="postcss" scoped>
</style>
