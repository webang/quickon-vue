<template>
  <div class="deco-container">
    <main-header />
    <div class="container">
    </div>
  </div>
</template>

<script>
import Login from '../../components/login';
import MainHeader from '../../components/main-header';

export default {
  components: {
    Login,
    MainHeader
  },
  data() {
    return {
      tableData: [],
      loading: false,
      addPageDialogVisible: false
    };
  }
};
</script>

<style lang="postcss" scoped>
.container {
  padding: 0 30px;
  padding-top: 30px;
  text-align: center;
}

.table-footer {
  margin-top: 20px;
}
</style>
