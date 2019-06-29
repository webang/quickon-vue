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
          <iframe id="simulator" :src="mobileUrl" frameborder="0"></iframe>
        </div>

        <!-- 编辑区域 -->
        <div class="widget-map">
          <div class="etc-item">
            <div class="etc-label">页面标题</div>
            <div class="etc-value">
              <el-input v-model="pageData.title" placeholder="请输入内容"></el-input>
            </div>
          </div>
          <div class="etc-item">
            <div class="etc-label">页面组件</div>
            <div class="etc-value">
              <nest-widget v-model="pageData.widget" @edit-widget="handleEdit"/>
            </div>
          </div>
          <div class="actions-bar">
            <el-button type="primary" @click="saveData">保存配置</el-button>
            <el-button type="primary" @click="handleClickAddWidget">添加组件</el-button>
            <el-button type="primary" @click="showPreCodeDialog=true">查看当前配置</el-button>
            <el-button type="primary" @click="handleReset">初始化配置</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑组件弹窗 -->
    <div v-if="showEditWidgetDialog">
      <edit-widget
        :data-form="editItem"
        v-model="showEditWidgetDialog"
        @confirm="handleConfirmEditWidget"
      />
    </div>

    <!-- 配置数据弹窗 -->
    <RawDisplay :code="pageData.widget" v-model="showPreCodeDialog"/>

    <!-- 添加组件弹窗 -->
    <AddWidget v-model="showAddWidgetDialog" @confirm="handleConfirmAddWidget"/>
  </div>
</template>

<script>
import axios from 'axios';
import draggable from 'vuedraggable';
import EditWidget from '../components/edit-widget';
import AddWidget from '../components/add-widget';
import NestWidget from '../components/nest-widget';
import RawDisplay from '../components/raw-display';
import propMap from '../../mobile/prop-map';
import nameMap from '../../mobile/name-map';
import Utils from '../utils';

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
    draggable,
    AddWidget,
    EditWidget,
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
      const { pageId } = this.$route.query;
      const { title, name, desc } = this.pageData;
      const widget = JSON.stringify(this.pageData.widget);
      const qs = `?title=${title}&widget=${widget}&name=${name}&desc=${desc}`;
      axios.post(`http://localhost:7001/api/page/${pageId}${qs}`).then(res => {
        console.log(res);
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
            console.log(element.id);
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
  min-height: 800px;
  padding: 24px;
  padding-top: 10px;
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

.widget-map {
  flex: 1;
  padding: 20px;
  margin-left: 30px;
  background: #fff;
}

.etc-value {
  max-width: 500px;
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
  margin-top: 40px;
}
</style>
