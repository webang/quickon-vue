<template>
  <div class="deco-view">
    <div class="header">
      <div class="btn-back">
        <div class="click-area" @click="$router.back()">
          <el-icon class="el-icon-arrow-left"></el-icon>
          <span>返回</span>
        </div>
        <span class="name">{{ $route.query.name }}</span>
      </div>
      <ul class="btn-group">
        <li @click="showPreCodeDialog=true">查看配置</li>
        <li @click="doCheck">预览</li>
        <li @click="saveData">发布</li>
      </ul>
    </div>

    <!-- 侧边栏 -->
    <sidebar @add-widget="handleConfirmAddWidget" />

    <div class="container">
      <!-- 模拟器 -->
      <!-- <simulator></simulator> -->
      <div class="simulator">
        <iframe id="simulator" :src="mobileUrl" frameborder="0" />
      </div>

      <!-- 编辑区域 -->
      <div class="drag-wrapper">
        <nest-widget v-model="pageData.widget" />
      </div>
    </div>

    <div class="toolbar">
      <div class="edit-widget">
        <edit-widget-area v-model="showEditWidgetDialog" />
      </div>
    </div>

    <!-- 配置数据弹窗 -->
    <RawDisplay :code="pageData.widget" v-model="showPreCodeDialog" />
  </div>
</template>

<script>
/**
 * @documention 编辑页面组件
 */
import EditWidgetArea from '../../components/edit-widget';
import NestWidget from '../../components/nest-widget';
import RawDisplay from '../../components/raw-display';
import Utils from '../../utils';
import apis from '../../apis';
import { mapState } from 'vuex';
import store from 'store';
import MainHeader from '../../components/main-header';
import Sidebar from './sidebar';
import Simulator from './simulator';

export default {
  components: {
    NestWidget,
    RawDisplay,
    EditWidgetArea,
    Sidebar,
    Simulator
  },
  data() {
    return {
      mobileUrl: '',
      pageData: {
        widget: []
      },
      childWindow: null,
      showEditWidgetDialog: false,
      showPreCodeDialog: false
    };
  },
  computed: {
    ...mapState({
      editKey: state => state.editKey,
      editForm: state => state.editForm
    })
  },
  watch: {
    'pageData.widget': {
      deep: true,
      handler() {
        this.updateCacheData();
      }
    },
    editKey(val) {
      store.set('editKey', val);
      if (this.childWindow) {
        this.childWindow.postMessage(
          {
            type: 'setEditKey'
          },
          `${window.location.origin}/mobile.html`
        );
      }
    }
  },
  mounted() {
    this.getInitData();
    this.mobileUrl = window.location.origin + '/mobile.html';
    try {
      this.childWindow = document.getElementById('simulator').contentWindow;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    /**
     * 将编辑的数据保存到数据库
     */
    saveData() {
      let widget;
      try {
        widget = JSON.stringify(this.pageData.widget);
      } catch (error) {
        this.$message({
          type: 'error',
          message: '格式有误'
        });
        return;
      }
      if (widget.length > 5000) {
        this.$message({
          type: 'error',
          message: '长度超出限制'
        });
        return;
      }

      apis
        .updateWidget({
          widget,
          pageId: this.$route.query.pageId
        })
        .then(res => {
          res = res.data;
          if (res.errCode === 0) {
            this.$message({
              type: 'success',
              message: '保存成功，请检查线上表现'
            });
          } else {
            this.$message({
              type: 'error',
              message: '保存失败，请联系管理员'
            });
          }
        });
    },

    /**
     * 确认添加组件
     */
    handleConfirmAddWidget(data) {
      data.id = Utils.getUniqueKey();
      this.pageData.widget.push(data);
      this.updateCacheData();
    },

    // 保存数据
    updateCacheData() {
      this.$store.commit('setCacheData', this.pageData);
      if (this.childWindow) {
        this.childWindow.postMessage(
          {
            type: 'reload'
          },
          `${window.location.origin}/mobile.html`
        );
      }
    },

    /**
     * 初始化数据
     */
    getInitData() {
      this.pageData = this.$store.state.cacheData;
    },

    /**
     * 预览
     */
    doCheck() {
      const url = `${window.location.origin}/mobile.html`;
      window.open(url);
    }
  }
};
</script>

<style lang="postcss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: 60px;
  line-height: 60px;
  border-bottom: solid 1px #e6e6e6;
  position: fixed;
  padding: 0 30px;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 100;
  li {
    float: left;
    padding: 0 20px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: #409eff;
    }
  }
  .click-area {
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
  .btn-back {
    display: flex;
    align-items: center;
    font-size: 16px;
  }
  .name {
    margin-left: 10px;
  }
}

.container {
  overflow-y: scroll;
  position: fixed;
  display: flex;
  left: 260px;
  top: 80px;
  right: 700px;
  bottom: 0;
  background-color: #f2f3f4;
}

.toolbar {
  overflow-y: auto;
  position: fixed;
  right: 0;
  top: 60px;
  width: 680px;
  height: 100%;
  background: #fff;
}

.simulator {
  width: 375px;
  height: 667px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #333;
  iframe {
    width: 100%;
    height: 100%;
  }
}

.drag-wrapper {
  overflow-y: auto;
  min-width: 375px;
  height: 667px;
  padding: 20px;
  padding-top: 10px;
  margin: 0 30px;
  background: #fff;
}
</style>
