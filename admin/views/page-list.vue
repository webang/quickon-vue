<template>
  <div class="view">
    <el-breadcrumb class="view__crumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>页面列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table class="view__main" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="页面索引" width="180"></el-table-column>
      <el-table-column prop="name" label="页面名称" width="180"></el-table-column>
      <el-table-column prop="desc" label="页面描述" width="180"></el-table-column>
      <el-table-column prop="title" label="页面标题" width="180"></el-table-column>
      <el-table-column prop="status" label="页面状态" width="180"></el-table-column>
      <el-table-column label="页面状态" width="180">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">查看</el-button>
          <el-button size="small" type="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    doGetPageList() {
      axios("http://localhost:7001/").then(res => {
        this.tableList = res.data;
        this.tableData = res.data;
      });
    },
    handleClickShow() {},
    handleEdit(data) {
      data.widget = JSON.parse(data.widget);
      window.localStorage.setItem("editProps", JSON.stringify(data));
      this.$router.push(`/EditPage?pageId=${data.id}`)
    }
  },
  mounted() {
    this.doGetPageList();
  }
};
</script>

<style lang="postcss" scoped>
.view {
  margin-top: 20px;
}
.view__crumb {
  margin-top: 20px;
}
.view__main {
  margin-top: 20px;
}
</style>
