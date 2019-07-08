<template>
  <div class="upload-wrapper">
    <el-upload
      ref="upload"
      class="upload"
      drag
      :auto-upload="false"
      :action="uploadUrl"
      :on-change="handleBeforeUpload"
      :on-success="handleUploadSuccess"
      :headers="headers"
      :data="{op: 'upload'}"
      name="filecontent"
      multiple
    >
      <img v-if="imgUrl" class="doc-edit-img" :src="imgUrl" alt />
      <template v-else>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </template>
    </el-upload>
    <el-button class="upload-btn" v-if="file" @click="doUpload">上传</el-button>
  </div>
</template>

<script>
import baseApi from '../../../mobile/apis/base';
import { getUniqueKey } from '../../utils';

function readFile(file, callback) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    callback(e);
  };
}

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filename: '',
      uploadUrl: '',
      signature: '',
      file: '',
      imgUrl: this.value
    };
  },
  computed: {
    headers() {
      return {
        Authorization: this.signature
      };
    }
  },
  watch: {
    value(val) {
      this.imgUrl = val;
    }
  },
  methods: {
    // 上传之前
    handleBeforeUpload(file) {
      this.file = file;
      this.filename = `${getUniqueKey()}.${file.name}`;
      this.createSign();
      readFile(file.raw, result => {
        this.imgUrl = result.currentTarget.result;
      });
    },

    // 上传成功
    handleUploadSuccess(res, file, fileList) {
      if (res.code === 0) {
        this.imgUrl = res.data.access_url.replace(
          'http://s1-1251010403.file.myqcloud.com',
          'https://s1.huishoubao.com'
        );
        this.$emit('input', this.imgUrl);
        this.$message({
          type: 'success',
          message: '上传成功'
        });
      } else {
        this.$message({
          type: 'error',
          message: '上传失败'
        });
      }
    },

    doUpload() {
      this.$refs.upload.submit();
    },

    // 获取上传签名
    async createSign() {
      try {
        let res = await baseApi.createUploadSign({
          fileName: this.filename
        });
        if (+res._errCode === 0) {
          this.uploadUrl = res._data.url;
          this.signature = res._data.signature;
        } else {
          this.$message({
            type: 'error',
            message: `生成签名错误: ${res._errStr}`
          });
        }
      } catch (err) {
        this.$message({
          type: 'error',
          message: err.toString()
        });
      }
    },

    // 上传图片
    async ajaxUpload({ signature, url }) {
      const formData = new FormData();
      formData.append('filecontent', this.file);
      formData.append('op', 'upload');
      try {
        // 直接调用腾讯云API，没有走HSB server
        let ret = await upload({ signature: signature, url: url, formData });
        if (ret.code === 0) {
          ret.data.access_url.replace(
            'http://s1-1251010403.file.myqcloud.com',
            'https://s1.huishoubao.com'
          );
          console.log(ret);
        } else {
          throw new Error('图片上传错误:' + ret.message);
        }
      } catch (err) {
        Toast(err);
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.upload-wrapper {
  overflow: hidden;
  margin-top: 10px;
  margin-left: 70px;
}

.upload {
  float: left;
}

.upload-btn {
  float: left;
  margin-left: 10px;
  margin-top: 140px;
}

.doc-edit-img {
  max-width: 357px;
  max-height: 178px;
}
</style>
