import store from 'store';
import adminApi from '../../apis';
import { Toast } from 'vant';

const token = store.get('fk_token');
const userInfo = store.get('fk_userInfo');

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
      store.set('fk_token', data);
    },
    setUserInfo(state, data) {
      state.userInfo = data;
      store.set('fk_userInfo', data);
    }
  },
  actions: {
    login({ commit }, { tel, code }) {
      return adminApi.login(tel, code).then(res => {
        if (+res._errCode === 0) {
          commit('setUserInfo', res._data);
          commit('setToken', res._data.token);
          commit('setShowLogin', false);
        } else {
          Toast(res._errStr);
        }
      });
    }
  }
};
