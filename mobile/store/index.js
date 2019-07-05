import vuex from 'vuex';
import vue from 'vue';
import store from 'store';
import user from './modules/user';
import pageApi from '../apis/index';
import parse from 'url-parse';

vue.use(vuex);

export default new vuex.Store({
  state: {
    editKey: '',
    pageData: {
      title: '',
      widget: []
    }
  },
  mutations: {
    setPageData(state, data) {
      const { widget } = data;
      widget.forEach(element => {
        if (element.style) {
          Object.keys(element.style).forEach(key => {
            if (!key) {
              delete element.style[key];
            }
          });
        }
      });
      state.pageData = data;
    },
    setEditKey(state, data) {
      state.editKey = data;
    }
  },
  actions: {
    getPageData({ commit }) {
      const obj = parse(window.location.href, true).query;
      if (!obj.pageId) {
        commit('setPageData', store.get('editProps'));
      } else {
        pageApi.getPageDetails(obj.pageId).then(res => {
          res.data.widget = JSON.parse(res.data.widget);
          commit('setPageData', res.data);
        });
      }
    }
  },
  modules: {
    user
  }
});
