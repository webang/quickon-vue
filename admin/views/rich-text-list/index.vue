<template>
  <div class="deco-container">
    <main-header />
    <div class="container">
      <!-- 页面导航 -->
      <el-breadcrumb class="doc-crumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>富文本列表</el-breadcrumb-item>
      </el-breadcrumb>

      <!-- 列表 -->
      <el-table class="view__main" :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="id" label="索引" width="200" />
        <el-table-column prop="name" label="名称" width="200" />
        <el-table-column prop="desc" label="描述" width="200" />
        <el-table-column label="动作" width="300">
          <template slot-scope="scope">
            <el-button size="small" plain type="primary" @click="handleEdit(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 底部按钮 -->
      <div class="table-footer">
        <el-button type="primary" plain @click="handleAdd">新增富文本</el-button>
        <el-pagination
          style="float:right"
          background
          layout="total, prev, pager, next"
          :total="total"
          :current-page="pageIndex"
          :page-size="pageSize"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @documention 页面列表
 */
import store from 'store';
import apis from '../../apis';
import MainHeader from '../../components/main-header';
import AddPageDialog from '../../components/add-page-dialog';
import EditPageMeta from '../../components/edit-page-meta';

export default {
  components: {
    MainHeader,
    EditPageMeta,
    AddPageDialog
  },
  data() {
    return {
      total: 0,
      pageSize: 10,
      pageIndex: 1,
      tableData: [],
      loading: false,
      editPageMetaVisible: false,
      addPageDialogVisible: false,
      pageMeta: null
    };
  },
  methods: {
    // 分页索引
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.doGetDataList();
    },

    // 页面列表
    doGetDataList() {
      this.loading = true;
      apis
        .getRichTextList({
          pageIndex: this.pageIndex - 1,
          pageSize: this.pageSize
        })
        .then(res => {
          this.loading = false;
          if (res.errCode === 0) {
            this.tableData = res.data.list;
            this.total = res.data.total;
          } else if (res.errCode === 10000) {
            this.$message({
              type: 'error',
              message: '请先登录'
            });
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          } else {
            this.$message({
              type: 'error',
              message: '获取数据失败'
            });
          }
        })
        .catch(error => {
          this.$message({
            type: 'error',
            message: error
          });
        });
    },

    // 添加成功
    handleAddSuccess() {
      this.doGetDataList();
    },

    // 编辑
    handleEdit(data) {
      store.set('editRichText', data);
      this.$router.push(`/ue?id=${data.id}&name=${data.name}`);
    },

    handleAdd() {
      console.log(store);
      store.remove('editRichText');
      this.$router.push(`/ue`);
    }
  },
  mounted() {
    this.doGetDataList();
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
