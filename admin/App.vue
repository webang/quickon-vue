<template>
  <div id="app">
    <div class="doc-row">
      <div class="main-header">
        <span>页面配置系统</span>
        <div class="menu">
          <router-link class="link" to="/PageList">页面列表</router-link>
        </div>
      </div>
    </div>
    <div class="doc-row">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import propMap from "../mobile/prop-map";
import nameMap from "../mobile/name-map";

export default {
  name: "App",
  components: {},
  data() {
    return {
      tableList: []
    };
  },
  methods: {
    getInitData() {
      let cache = getProp();
      if (cache) cache = JSON.parse(cache);
      this.pageData = cache;
    },
    doGetPageList() {
      axios("http://localhost:7001/").then(res => {
        this.tableList = res.data;
      });
    }
  },
  mounted() {
    this.doGetPageList();
  }
};
</script>

<style lang="postcss" scoped>
.main-header {
  z-index: 10;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  max-width: 100%;
  padding: 0 30px;
  font-size: 20px;
  color: #fff;
  margin-top: 10px;
  background: #001938;
  box-shadow: 0 2px 8px #f0f1f2;
}

.main-container {
  display: flex;
  min-height: 800px;
  padding: 24px;
  margin-top: 20px;
  background: #fff;
}

.menu {
  float: right;
  font-size: 14px;
}

.link {
  color: #fff;
}

.link:hover {
  color: #409EFF;
}
</style>
