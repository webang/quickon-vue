<template>
  <div class="deco-container">
    <main-header />
    <div class="container">
    </div>
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
     * 点击编辑时，先将当前编辑项数据存到本地
     */
    handleEdit(data) {
      data.widget = JSON.parse(data.widget);
      this.$store.commit('setCacheData', data);
      this.$router.push(`/EditPage?pageId=${data.id}`);
    }
  },
  mounted() {
    this.doGetPageList();
  }
};
</script>

<style lang="postcss" scoped>
.container {
  padding: 0 30px;
}

.table-footer {
  margin-top: 20px;
}
</style>
