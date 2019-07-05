import httpInstance from './http';

export default {
  updatePage({ pageId, title, widget }) {
    return httpInstance(
      `/admin/page?pageId=${pageId}&title=${title}&widget=${widget}`
    );
  },

  // 获取页面列表
  getPageList() {
    return httpInstance.get(`/admin/page`);
  },

  // 添加页面
  addPage({ name, title, desc, widget = [] }) {
    return httpInstance.post(`/admin/page`, {
      name,
      title,
      desc,
      widget: JSON.stringify(widget)
    });
  },

  // 更新页面widget
  updateWidget({ pageId, widget }) {
    return httpInstance.post(`/admin/page/${pageId}`, {
      widget
    });
  },

  // 登录
  login({ username, password }) {
    return httpInstance.post(`/admin/user/login`, {
      username,
      password
    });
  },

  // 登录
  register({ username, password }) {
    return httpInstance.post(`/admin/user/register`, {
      username,
      password
    });
  }
};
