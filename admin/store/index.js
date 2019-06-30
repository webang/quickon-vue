import vuex from 'vuex'
import vue from 'vue'
import store from 'store'

vue.use(vuex)

export default new vuex.Store({
  state: {
    editKey: '',
    styleStr: '',
    styleObj: {
      width: '',
      height: '',
      left: '',
      top: ''
    },
    editForm: store.get('editProps').widget,
    cacheData: store.get('editProps')
  },
  mutations: {
    setEditKey(state, data) {
      state.editKey = data;
    },
    setEditForm(state, data) {
      state.editForm = data
    },
    setCacheData(state, data) {
      state.cacheData = data
      store.set('editProps', data)
    }
  },
  actions: {
    handleEdit({ commit }, { editKey, editForm }) {
      commit('setEditKey', editKey)
      commit('setEditForm', editForm)
    }
  }
})