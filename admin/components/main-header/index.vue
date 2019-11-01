<template>
  <div class="header">
    <span class="title" @click="backHome">quickon 页面装修系统</span>
    <div class="menu">
      <router-link class="link" to="/PageList">页面管理</router-link>
      <router-link class="link" to="/RichTextList">文章管理</router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    backHome () {
      this.$router.push('/')
    }
  }
};
</script>

<style lang="postcss" scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  background: #2a2a2a;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 14px;
  padding-left: 30px;
  padding-right: 30px;
  border-bottom: 1px solid #dcdfe6;
}

.title {
  font-size: 16px;
  cursor: pointer;
}

.menu {
  float: right;
  font-size: 14px;
}

.link {
  margin-left: 20px;
  color: #fff;
}

.link:hover {
  color: #409eff;
}
</style>