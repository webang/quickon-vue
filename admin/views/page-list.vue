<template>
  <div class="view">

    <el-breadcrumb class="doc-crumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>页面列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table class="view__main" :data="tableData" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="页面索引" width="180"></el-table-column>
      <el-table-column prop="name" label="页面名称" width="180"></el-table-column>
      <el-table-column prop="desc" label="页面描述" width="180"></el-table-column>
      <el-table-column prop="title" label="页面标题" width="180"></el-table-column>
      <el-table-column prop="status" label="页面状态" width="180"></el-table-column>
      <el-table-column label="页面状态" width="180">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">查看</el-button>
          <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="table-footer">
      <el-button type="primary" plain @click="addPageDialogVisible=true">新建页面</el-button>
    </div>

    <add-page-dialog v-model="addPageDialogVisible" @add-success="handleAddSuccess"/>

  </div>
</template>

<script>
import axios from 'axios';
import apis from '../apis';
import AddPageDialog from '../components/add-page-dialog';

export default {
  components: {
    AddPageDialog
  },
  data() {
    return {
      tableData: [],
      loading: false,
      addPageDialogVisible: false
    };
  },
  methods: {
    /**
     * 获取页面列表
     */
    doGetPageList() {
      this.loading = true;
      apis.getPageList().then(res => {
        setTimeout(() => {
          this.tableData = res.data.data.list;
          this.loading = false;
        }, 300);
      });
    },

    /**
     * 点击查看可能需要生成一个二维码
     */
    handleClickShow() {},

    /**
     * 当添加成功时刷新列表数据
     */
    handleAddSuccess() {
      this.doGetPageList();
    },

    /**
     * 点击编辑时，先将当前编辑项数据存到本地
     */
    handleEdit(data) {
      data.widget = JSON.parse(data.widget);
      window.localStorage.setItem('editProps', JSON.stringify(data));
      this.$router.push(`/EditPage?pageId=${data.id}`);
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
.table-footer {
  margin-top: 20px;
}
</style>
