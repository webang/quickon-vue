<template>
  <div class="deco-container">
    <main-header />
    <div class="container">
      <!-- 页面导航 -->
      <el-breadcrumb class="doc-crumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>页面列表</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 页面列表 -->
      <el-table class="view__main" :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="页面索引" width="200" />
        <el-table-column prop="name" label="页面名称" width="200" />
        <el-table-column prop="desc" label="页面描述" />
        <el-table-column prop="title" label="页面标题" width="200" />
        <el-table-column prop="status" label="页面状态" width="200" />
        <el-table-column label="页面状态" width="200">
          <template slot-scope="scope">
            <el-button size="small" type="primary" @click="handleShow(scope.row)">线上查看</el-button>
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 底部按钮 -->
      <div class="table-footer">
        <el-button type="primary" plain @click="addPageDialogVisible=true">新建页面</el-button>
      </div>
    </div>
    <!-- 新增页面弹窗 -->
    <add-page-dialog v-model="addPageDialogVisible" @add-success="handleAddSuccess" />
  </div>
</template>

<script>
/**
 * @documention 页面列表
 */
import apis from '../../apis';
import MainHeader from '../../components/main-header';
import AddPageDialog from '../../components/add-page-dialog';

export default {
  components: {
    MainHeader,
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
        res = res.data;
        if (res.errCode === 0) {
          setTimeout(() => {
            this.tableData = res.data.list;
            this.loading = false;
          }, 300);
        } else {
          this.$message({
            type: 'error',
            message: '获取数据失败'
          });
        }
      });
    },

    /**
     * 当添加成功时刷新列表数据
     */
    handleAddSuccess() {
      this.doGetPageList();
    },

    /**
     * 线上地址
     */
    handleShow({ id }) {
      const url = `${window.location.origin}/mobile.html?pageId=${id}`;
      window.open(url);
    },

    /**
     * 点击编辑时，先将当前编辑项数据存到本地
     */
    handleEdit(data) {
      data.widget = JSON.parse(data.widget);
      this.$store.commit('setEditKey', '');
      this.$store.commit('setCacheData', data);
      this.$router.push(`/EditPageV2?pageId=${data.id}&name=${data.name}`);
    }
  },
  mounted() {
    this.doGetPageList();
  }
};
</script>

<style lang="postcss" scoped>
.container {
  overflow: scroll;
  flex: 1;
  padding: 0 30px;
  padding-bottom: 20px;
}

.table-footer {
  margin-top: 20px;
}
</style>
