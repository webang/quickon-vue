import vuex from 'vuex';
import vue from 'vue';
import store from 'store';
import user from './module/user';

vue.use(vuex);

const editProps = store.get('editProps') || {};

export default new vuex.Store({
  modules: {
    user
  },
  state: {
    showEditWidget: false,
    editKey: '',
    styleStr: '',
    styleObj: {
      width: '',
      height: '',
      left: '',
      top: ''
    },
    editForm: {},
    cacheData: editProps
  },
  mutations: {
    setEditKey(state, data) {
      state.editKey = data;
    },
    setEditForm(state, data) {
      state.editForm = data;
    },
    setCacheData(state, data) {
      state.cacheData = data;
      store.set('editProps', data);
    },
    setShowEditWidget(state, data) {
      state.showEditWidget = data;
    },
    setStyleStr(state, data) {
      state.styleStr = data;
    },
    styleObj(state, data) {
      state.styleObj = data;
    }
  },
  actions: {
    /**
     * 点击编辑组件
     * @param {*} param0 编辑组件ID
     * @param {*} param1 编辑组件数据
     */
    handleEdit({ commit }, { editKey, editForm }) {
      commit('setEditKey', editKey);
      commit('setEditForm', editForm);
      commit('setStyleStr', '');
      commit('styleObj', '');
      commit('setShowEditWidget', true);
    },

    /**
     * 确认编辑
     * @param {*} param0
     */
    handleEditForm({ commit, state }, data) {
      const list = state.cacheData.widget;
      const finder = list => {
        list.forEach((element, index) => {
          if (element.id === state.editKey) {
            list[index] = data;
          } else {
            if (element.child && element.child.length) {
              finder(element.child);
            }
          }
        });
      };
      finder(list);
      state.cacheData.widget = [].concat(list);
      commit('setCacheData', state.cacheData);
    }
  }
});
