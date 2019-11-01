<template>
  <div class="deco-container">
    <MainHeader />
    <div class="container">
      <h3 class="title">页面快速上线工具</h3>
      <img class="ui-full bg" src="../../assets/img/WechatIMG62.jpeg" alt="">
      <el-button type="primary" size="large">立即开始</el-button>
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
.deco-container {
  min-height: 100vh;
  background: #fff;
}

.container {
  padding: 0 30px;
  padding-top: 30px;
  text-align: center;
}

.table-footer {
  margin-top: 20px;
}

.bg {
  width: 800px;
  margin: 0 auto;
  margin-top: 50px;
}

.title {
  font-size: 30px;
}
</style>
