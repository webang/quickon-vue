import axios from 'axios';
const apiBase = 'http://10.0.10.112:7001';

export default {
  updatePage({ pageId, title, widget }) {
    return axios(`${apiBase}/api/page?pageId=${pageId}&title=${title}&widget=${widget}`);
  },

  // 获取页面列表
  getPageList() {
    return axios.get(`${apiBase}/api/page`);
  },

  // 添加页面
  addPage({ name, title, desc, widget = [] }) {
    return axios.post(`${apiBase}/api/page`, {
      name,
      title,
      desc,
      widget: JSON.stringify(widget)
    });
  },

  // 更新页面widget
  updateWidget({ pageId, widget }) {
    return axios.post(`${apiBase}/api/page/${pageId}`, {
      widget
    });
  }
};
