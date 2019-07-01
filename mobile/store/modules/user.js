import store from 'store';
import baseApi from '../../apis/base';
import { Toast } from 'vant';

const token = store.get('token');
const userInfo = store.get('userInfo');

export default {
  namespaced: true,
  state: {
    token: token,
    userInfo: userInfo,
    showLogin: false
  },
  mutations: {
    setShowLogin(state, data) {
      state.showLogin = data;
    },
    setToken(state, data) {
      state.token = data;
      store.set('userInfo', data);
    },
    setUserInfo(state, data) {
      state.userInfo = data;
      store.set('userInfo', data);
    }
  },
  actions: {
    login({ commit }, { tel, code }) {
      return baseApi.login(tel, code).then(res => {
        if (+res._errCode === 0) {
          commit('setUserInfo', res._data);
          commit('setToken', res._data.token);
        } else {
          Toast(res._errStr);
        }
      });
    }
  }
};
