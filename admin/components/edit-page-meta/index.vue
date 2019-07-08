<template>
  <el-dialog title="修改页面标题" :visible="value" :show-close="false">
    <div class="body" v-loading="loading">
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
import Utils from '../../utils';
import adminApi from '../../apis';

export default {
  props: {
    value: Boolean,
    formData: Object
  },
  data() {
    return {
      loading: false,
      formObj: {
        name: '',
        title: '',
        desc: ''
      }
    };
  },
  watch: {
    formData() {
      this.initForm();
    }
  },
  created() {
    this.initForm();
  },
  computed: {
    disabled() {
      const formObj = this.formObj;
      return !formObj.title.length || !formObj.name.length || !formObj.desc.length;
    }
  },
  methods: {
    initForm() {
      if (this.formData) {
        this.formObj = {
          ...this.formData
        };
      }
    },
    // 确认添加页面
    async handleConfirm() {
      this.loading = true;
      adminApi
        .updatePage({
          pageId: this.formData.id,
          ...this.formObj
        })
        .then(res => {
          this.loading = false;
          if (res.errCode === 0) {
            this.$message({
              message: '恭喜您，修改成功',
              type: 'success'
            });
            this.$emit('input', false);
            this.$emit('confirm');
          } else {
            this.$message({
              message: '修改失败了，请联系管理员',
              type: 'error'
            });
          }
        })
        .catch(error => {
          this.loading = false;
          this.$message({
            type: 'error',
            message: error
          });
        });
    },

    // 取消
    handleCancle() {
      this.$emit('input', false);
    }
  }
};
</script>

<style lang="postcss" scoped>
.btn {
  margin-top: 20px;
}
</style>
