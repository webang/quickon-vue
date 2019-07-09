<template>
  <div>
    <script :id="id" type="text/plain"></script>
  </div>
</template>
<script>
export default {
  name: 'UE',
  data() {
    return {
      editor: null
    };
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    },
    id: {
      type: String
    }
  },
  mounted() {
    const _this = this;
    this.editor = UE.getEditor(this.id, this.config); // 初始化UE
    this.editor.addListener('ready', function() {
      _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
    });
    setTimeout(() => {
      let content = this.getUEContent();
      this.timeId = setInterval(() => {
        let str = this.getUEContent();
        if (str !== content) {
          content = str;
          _this.$emit('change', content);
        }
      }, 300);
    }, 1000);
    console.log('上传这堆错误不用理会，上传接口需自行开发配置');
  },
  methods: {
    getUEContent() {
      // 获取内容方法
      return this.editor.getContent();
    },
    getUEContentTxt() {
      // 获取纯文本内容方法
      return this.editor.getContentTxt();
    }
  },
  destroyed() {
    this.editor.destroy();
    clearInterval(this.timeId);
  }
};
</script>
