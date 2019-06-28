<template>
  <div class="view">
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
            <el-button type="primary" @click="doUpateData">保存配置</el-button>
            <el-button type="primary" @click="handleClickAddWidget">添加组件</el-button>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑组件弹窗 -->
    <edit-widget
      :data-form="editItem"
      v-model="showEditWidgetDialog"
      @confirm="handleConfirmEditWidget"
    />

    <!-- 配置数据弹窗 -->
    <RawDisplay :code="pageData.widget" v-model="showPreCodeDialog"/>

    <!-- 添加组件弹窗 -->
    <AddWidget v-model="showAddWidgetDialog" @confirm="handleConfirmAddWidget"/>
  </div>
</template>

<script>
import axios from "axios";
import draggable from "vuedraggable";
import EditWidget from "../components/edit-widget";
import AddWidget from "../components/add-widget";
import NestWidget from "../components/nest-widget";
import RawDisplay from "../components/raw-display";
import propMap from "../../mobile/prop-map";
import nameMap from "../../mobile/name-map";

/**
 * 更新缓存数据
 */
const updateProp = data => {
  window.localStorage.setItem("editProps", JSON.stringify(data));
};

/**
 * 获取本地缓存数据
 */
const getProp = () => {
  let cache = window.localStorage.getItem("editProps");
  return cache;
};

export default {
  name: "App",
  components: {
    draggable,
    AddWidget,
    EditWidget,
    NestWidget,
    RawDisplay
  },
  data() {
    return {
      mobileUrl: "",
      pageData: {
        title: "",
        widget: []
      },
      editIndex: -1,
      editItem: {},
      childWindow: null,
      nameMap,
      materialList: Object.keys(nameMap),
      showAddWidgetDialog: false,
      showEditWidgetDialog: false,
      showPreCodeDialog: false
    };
  },
  watch: {
    "pageData": {
      deep: true,
      handler(val) {
        this.doUpateData();
      }
    }
  },
  methods: {
    handleEdit(widget, index) {
      this.editItem = widget;
      this.showEditWidgetDialog = true;
    },

    // 保存数据
    doUpateData() {
      const widget = JSON.stringify(this.pageData.widget);
      updateProp(this.pageData);
      this.reloadMobile();
    },

    handleConfirmEditWidget(data) {
      this.showEditWidgetDialog = false;
      this.editItem = data;
      this.doUpateData();
    },

    // 添加组件
    handleClickAddWidget() {
      this.showAddWidgetDialog = true;
    },

    handleConfirmAddWidget(data) {
      this.pageData.widget.push(data);
      this.doUpateData();
    },

    reloadMobile() {
      const payload = {
        type: "reload"
      };
      this.childWindow.postMessage(
        payload,
        `${window.location.origin}/mobile.html`
      );
    },

    getInitData() {
      let cache = getProp();
      if (cache) cache = JSON.parse(cache);
      this.pageData = cache;
    }
  },
  mounted() {
    this.getInitData();
    this.mobileUrl = window.location.origin + "/mobile.html";
    // axios("http://localhost:7001/").then(res => {
    //   res.data[0].widget = JSON.parse(res.data[0].widget);
    //   this.pageData = res.data[0];
    // });
    this.childWindow = document.getElementById("simulator").contentWindow;
  }
};
</script>

<style lang="postcss" scoped>
.main-container {
  display: flex;
  min-height: 800px;
  padding: 24px;
  margin-top: 20px;
  /* background: #fff; */
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
  max-width: 300px;
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
