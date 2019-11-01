<template>
  <div class="page page-article">
    <MainHeader />
    <div class="container">
      <div id="editor">This is the editor content</div>
      <el-button class="btn" @click="handleSaveData">保存数据</el-button>
    </div>
  </div>
</template>

<script>
import MainHeader from '../../components/main-header';

export default {
  components: {
    MainHeader
  },

  methods: {
    handleSaveData(val) {
      console.log(window.CKEDITOR.instances.editor.getData());
    }
  },

  mounted() {
    window.CKEDITOR.replace('editor');
  }
};
</script>

<style lang="postcss" scoped>
.container {
  width: 1400px;
  margin: 0 auto;
  margin-top: 30px;
}

.btn {
  margin-top: 20px;
}
</style>
