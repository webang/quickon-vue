<template>
  <div class="view">
    <!-- 导航 -->
    <el-breadcrumb class="doc-crumb" separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/PageList' }">页面列表</el-breadcrumb-item>
      <el-breadcrumb-item>页面详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="doc-row">
      <div class="main-container">
        <!-- 模拟器 -->
        <div class="simulator">
          <iframe id="simulator" :src="mobileUrl" frameborder="0"/>
        </div>

        <!-- 编辑区域 -->
        <div class="drag-wrapper">
          <div class="etc-item">
            <div class="etc-value">
              <nest-widget v-model="pageData.widget" @edit-widget="handleEdit"/>
            </div>
          </div>
          <div class="actions-bar">
            <el-button type="primary" size="small" @click="handleClickAddWidget">添加组件</el-button>
            <el-button type="primary" size="small" @click="showPreCodeDialog=true">查看配置</el-button>
            <div style="margin-top: 10px">
              <el-button type="danger" size="small" @click="saveData">保存数据</el-button>
              <el-button type="danger" size="small" @click="handleReset">重置数据</el-button>
            </div>
          </div>
        </div>

        <!-- 属性值编辑区 -->
        <edit-widget-area
          v-if="showEditWidgetDialog"
          :data-form="editItem"
          v-model="showEditWidgetDialog"
          @confirm="handleConfirmEditWidget"
        />
      </div>
    </div>

    <!-- 配置数据弹窗 -->
    <RawDisplay :code="pageData.widget" v-model="showPreCodeDialog"/>

    <!-- 添加组件弹窗 -->
    <AddWidget v-model="showAddWidgetDialog" @confirm="handleConfirmAddWidget"/>
  </div>
</template>

<script>
/**
 * @documention 编辑页面组件
 */
import EditWidgetDialog from '../components/edit-widget-dialog';
import EditWidgetArea from '../components/edit-widget';
import AddWidget from '../components/add-widget';
import NestWidget from '../components/nest-widget';
import RawDisplay from '../components/raw-display';
import propMap from '../../mobile/prop-map';
import nameMap from '../../mobile/name-map';
import Utils from '../utils';
import apis from '../apis';

/**
 * 更新缓存数据
 */
const updateProp = data => {
  window.localStorage.setItem('editProps', JSON.stringify(data));
};

/**
 * 获取本地缓存数据
 */
const getProp = () => {
  let cache = window.localStorage.getItem('editProps');
  return cache;
};

export default {
  name: 'App',
  components: {
    AddWidget,
    EditWidgetArea,
    EditWidgetDialog,
    NestWidget,
    RawDisplay
  },
  data() {
    return {
      mobileUrl: '',
      pageData: {
        title: '',
        widget: []
      },
      editIndex: -1,
      editItem: {},
      childWindow: null,
      nameMap,
      materialList: Object.keys(nameMap),
      showAddWidgetDialog: false,
      showEditWidgetDialog: false,
      showPreCodeDialog: false,
      editWidgetKey: ''
    };
  },
  watch: {
    pageData: {
      deep: true,
      handler(val) {
        this.doUpateData();
      }
    }
  },
  methods: {
    /**
     * 将编辑的数据保存到数据库
     */
    saveData() {
      apis
        .updateWidget({
          pageId: this.$route.query.pageId,
          widget: this.pageData.widget
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
     * 重置页面数据
     */
    handleReset() {
      this.pageData = Utils.getInitPageConf();
    },

    /**
     * 点击编辑按钮
     */
    handleEdit(widget, index) {
      this.editItem = widget;
      this.editWidgetKey = widget.id;
      this.showEditWidgetDialog = true;
    },

    /**
     * 确认编辑
     */
    handleConfirmEditWidget(data) {
      const finder = list => {
        list.forEach((element, index) => {
          if (element.id === this.editItem.id) {
            list[index] = data;
          } else {
            if (element.child && element.child.length) {
              finder(element.child);
            }
          }
        });
      };
      finder(this.pageData.widget);
      const pageData = JSON.stringify(this.pageData);
      this.pageData = JSON.parse(pageData);
      this.doUpateData();
    },

    /**
     * 确认添加组件
     */
    handleConfirmAddWidget(data) {
      data.id = Utils.getUniqueKey();
      this.pageData.widget.push(data);
      this.doUpateData();
    },

    // 保存数据
    doUpateData() {
      const widget = JSON.stringify(this.pageData.widget);
      updateProp(this.pageData);
      this.reloadMobile();
    },

    // 添加组件
    handleClickAddWidget() {
      this.showAddWidgetDialog = true;
    },

    reloadMobile() {
      const payload = {
        type: 'reload'
      };
      this.childWindow.postMessage(payload, `${window.location.origin}/mobile.html`);
    },

    getInitData() {
      let cache = getProp();
      if (cache) cache = JSON.parse(cache);
      this.pageData = cache;
    }
  },
  mounted() {
    this.getInitData();
    this.mobileUrl = window.location.origin + '/mobile.html';
    this.childWindow = document.getElementById('simulator').contentWindow;
  }
};
</script>

<style lang="postcss" scoped>
.main-container {
  display: flex;
}

.simulator {
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
  /* flex: 1; */
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

.edit-wrapper {
}

.edit-input {
  display: block;
  width: 300px;
}

.actions-bar {
  margin-top: 30px;
}
</style>
