<template>
  <div class="header">
    <span>FK页面装修系统</span>
    <div class="menu">
      <router-link class="link" to="/PageList">页面列表</router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="postcss" scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  height: 60px;
  background: #2a2a2a;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-align: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  padding-left: 30px;
  padding-right: 30px;
}

.menu {
  float: right;
  font-size: 14px;
}

.link {
  color: #fff;
}

.link:hover {
  color: #409eff;
}
</style>