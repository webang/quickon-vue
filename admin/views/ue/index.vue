<template>
  <div class="components-container">
    <MainHeader />
    <div class="container">
      <!-- 页面导航 -->
      <el-breadcrumb class="doc-crumb" separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/RichTextList' }">富文本列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="!id">新增富文本</el-breadcrumb-item>
        <el-breadcrumb-item v-if="id">{{ $route.query.name }}</el-breadcrumb-item>
      </el-breadcrumb>

      <el-input class="input" v-model="form.name" placeholder="名称" />
      <el-input class="input" v-model="form.desc" placeholder="描述" />
      <div class="editor-container">
        <UE :defaultMsg="form.content" :config="config" :id="ue1" ref="ue" @change="handleChange"></UE>
      </div>
      <el-button class="btn" @click="handleSaveData">保存数据</el-button>
    </div>
  </div>
</template>

<script>
import store from 'store';
import UE from '../../components/ue';
import apis from '../../apis/index';
import MainHeader from '../../components/main-header';

export default {
  components: {
    UE,
    MainHeader
  },
  data() {
    return {
      config: {
        initialFrameWidth: null,
        initialFrameHeight: 350
      },
      form: {
        name: '',
        desc: '',
        content: ''
      },
      ue1: 'ue1', // 不同编辑器必须不同的id
      ue2: 'ue2'
    };
  },
  computed: {
    id() {
      return this.$route.query.id;
    }
  },
  watch: {
    form: {
      handler(val) {
        console.log(val);
        store.set('editRichText', val);
      },
      deep: true
    }
  },
  mounted() {
    const cache = store.get('editRichText');
    if (!cache) {
      return;
    }
    this.form = { ...cache };
  },
  methods: {
    handleChange(val) {
      this.form.content = val;
    },

    handleSaveData() {
      if (this.id) {
        this.doUpdate();
      } else {
        this.doAdd();
      }
    },

    doUpdate() {
      apis
        .updateRichText(this.form)
        .then(res => {
          if (res.errCode === 0) {
            this.$message({
              type: 'success',
              message: '更新成功'
            });
          } else if (res.errCode === 10000) {
            this.$message({
              type: 'error',
              message: '请先登录'
            });
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          } else {
            this.$message({
              type: 'error',
              message: '更新失败'
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    doAdd() {
      apis
        .addRichText(this.form)
        .then(res => {
          if (res.errCode === 0) {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
          } else if (res.errCode === 10000) {
            this.$message({
              type: 'error',
              message: '请先登录'
            });
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
          } else {
            this.$message({
              type: 'error',
              message: '添加失败'
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    // 页面列表
    doGetRichText() {
      this.loading = true;
      apis
        .getRichTextDetail({
          id: 2
        })
        .then(res => {
          this.loading = false;
          if (res.errCode === 0) {
            this.name = res.data.name;
            this.desc = res.data.desc;
            this.content = res.data.content;
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
    getUEContent() {
      let content = this.$refs.ue.getUEContent();
      this.$notify({
        title: '获取成功，可在控制台查看！',
        message: content,
        type: 'success'
      });
      console.log(content);
    },
    getUEContentTxt() {
      let content = this.$refs.ue.getUEContentTxt();
      this.$notify({
        title: '获取成功，可在控制台查看！',
        message: content,
        type: 'success'
      });
      console.log(content);
    }
  }
};
</script>

<style lang="postcss" scoped>
.container {
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
}

.btn {
  margin-top: 20px;
}

.input {
  margin-bottom: 10px;
}
</style>