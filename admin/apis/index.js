import httpInstance from './http';

export default {
  // 获取页面列表
  getPageList({ pageIndex, pageSize }) {
    return httpInstance.get(`/admin/page?pageIndex=${pageIndex}&pageSize=${pageSize}`);
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

  // 更新页面
  updatePage({ pageId, widget, name, title, desc }) {
    return httpInstance.post(`/admin/page/${pageId}`, {
      pageId,
      name,
      title,
      desc,
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
