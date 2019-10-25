import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const apiBase = isProd ? 'http://kbapi.airtlab.com' : 'http://10.0.10.112:7001';
const instance = axios.create({
  baseURL: apiBase
});

export default {
  // 获取页面配置
  getPageDetails(id) {
    return instance.get(`/api/page/${id}`);
  },

  // 获取文本配置
  getRichTextDetails(id) {
    return instance.get(`/api/richText/${id}`);
  }
};
