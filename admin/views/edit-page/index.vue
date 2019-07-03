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

    <div class="container">
      <!-- 模拟器 -->
      <div class="simulator">
        <iframe id="simulator" :src="mobileUrl" frameborder="0" />
      </div>

      <!-- 编辑区域 -->
      <div class="drag-wrapper">
        <div class="etc-item">
          <div class="etc-value">
            <nest-widget v-model="pageData.widget" />
          </div>
        </div>
        <div class="actions-bar">
          <el-button type="primary" size="small" @click="handleClickAddWidget">添加组件</el-button>
        </div>
      </div>

      <!-- 属性值编辑区 -->
      <div class="edit-widget">
        <edit-widget-area v-model="showEditWidgetDialog" />
      </div>
    </div>

    <!-- 配置数据弹窗 -->
    <RawDisplay :code="pageData.widget" v-model="showPreCodeDialog" />

    <!-- 添加组件弹窗 -->
    <AddWidget v-model="showAddWidgetDialog" @confirm="handleConfirmAddWidget" />
  </div>
</template>

<script>
/**
 * @documention 编辑页面组件
 */
import EditWidgetArea from '../../components/edit-widget';
import AddWidget from '../../components/add-widget-dialog';
import NestWidget from '../../components/nest-widget';
import RawDisplay from '../../components/raw-display';
import Utils from '../../utils';
import apis from '../../apis';
import { mapState } from 'vuex';
import store from 'store';
import MainHeader from '../../components/main-header';

export default {
  components: {
    AddWidget,
    NestWidget,
    RawDisplay,
    EditWidgetArea
  },
  data() {
    return {
      mobileUrl: '',
      pageData: {
        widget: []
      },
      childWindow: null,
      showAddWidgetDialog: false,
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
    // 当
    'pageData.widget': {
      deep: true,
      handler() {
        this.updateCacheData();
      }
    },
    editKey(val) {
      store.set('editKey', val);
      this.childWindow.postMessage(
        {
          type: 'setEditKey'
        },
        `${window.location.origin}/mobile.html`
      );
    }
  },
  mounted() {
    this.getInitData();
    this.mobileUrl = window.location.origin + '/mobile.html';
    this.childWindow = document.getElementById('simulator').contentWindow;
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
      this.childWindow.postMessage(
        {
          type: 'reload'
        },
        `${window.location.origin}/mobile.html`
      );
    },

    // 添加组件
    handleClickAddWidget() {
      this.showAddWidgetDialog = true;
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
  left: 60px;
  top: 80px;
  right: 0;
  bottom: 0;
  background-color: #f4f4f4;
}

.simulator {
  float: left;
  width: 375px;
  height: 667px;
  background: #fff;
  border: 1px solid #333;
  iframe {
    width: 100%;
    height: 100%;
  }
}

.drag-wrapper {
  float: left;
  min-width: 375px;
  padding: 20px;
  padding-top: 0px;
  margin: 0 30px;
  background: #fff;
}

.etc-value {
  max-width: 350px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.etc-label {
  margin-bottom: 10px;
}

.widget-item {
  width: 400px;
  font-size: 14px;
  padding: 10px 12px;
  margin-top: 10px;
  margin-bottom: 10px;
  background: #fff;
  cursor: pointer;
  border: 1px solid #67c23a;
  .btn {
    margin-left: 20px;
  }
  &.sortable-chosen {
    cursor: all-scroll;
    border-color: red;
  }
}

.edit-input {
  display: block;
  width: 300px;
}

.actions-bar {
  margin-top: 30px;
}

.edit-widget {
  overflow: scroll;
  float: left;
  width: 1000px;
  height: 800px;
}
</style>
