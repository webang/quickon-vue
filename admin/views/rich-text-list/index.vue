<template>
  <div class="page page-rich-text">
    <MainHeader />
    <div class="container">
      <div id="editor">
        <p>This is the editor content.</p>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '../../components/main-header';
// import 'ckeditor/ckeditor';
console.log(window.CKEDITOR);

export default {
  components: {
    MainHeader
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
</style>
