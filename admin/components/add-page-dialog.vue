<template>
  <el-dialog title="填写页面参数" :visible="value">
    <div class="body">
      <div class="doc-edit-row">
        <span class="doc-edit-row-label">页面名称</span>
        <el-input class="doc-edit-row-value" v-model="formObj.name" />
      </div>
      <div class="doc-edit-row">
        <span class="doc-edit-row-label">页面标题</span>
        <el-input class="doc-edit-row-value" v-model="formObj.title" />
      </div>
      <div class="doc-edit-row">
        <span class="doc-edit-row-label">页面描述</span>
        <el-input class="doc-edit-row-value" v-model="formObj.desc" />
      </div>
      <el-button class="btn" type="primary" @click="handleCancle">取 消</el-button>
      <el-button class="btn" type="primary" :disabled="disabled" @click="handleConfirm">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
import Utils from '../utils';
import adminApi from '../apis';

export default {
  props: {
    value: Boolean
  },
  data() {
    const obj = Utils.getInitPageConf();
    return {
      formObj: {
        name: obj.name,
        title: obj.title,
        desc: obj.desc
      }
    };
  },
  computed: {
    disabled() {
      const formObj = this.formObj;
      return !formObj.title.length || !formObj.name.length || !formObj.desc.length;
    }
  },
  watch: {
    centerDialogVisible(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    /**
     * 确认
     */
    async handleConfirm() {
      adminApi
        .addPage({
          ...this.formObj,
          widget: Utils.getInitPageConf().widget
        })
        .then(res => {
          res = res.data;
          if (res.errCode === 0) {
            this.$message({
              message: '恭喜你，新增页面成功',
              type: 'success'
            });
            this.$emit('add-success');
            this.$emit('input', false);
          } else {
            this.$message({
              message: '新增页面失败了，请联系管理员',
              type: 'error'
            });
          }
        });
    },

    /**
     * 取消
     */
    handleCancle() {
      this.resetData();
      this.$emit('input', false);
    },

    /**
     * 重置弹窗数据
     */
    resetData() {
      // this.formObj = {
      //   title: '',
      //   name: '',
      //   desc: ''
      // };
    }
  }
};
</script>

<style lang="postcss" scoped>
.btn {
  margin-top: 20px;
}
</style>
